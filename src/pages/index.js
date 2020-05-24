import React, { useState, useEffect, useRef } from "react";
import "reset-css";
import { shuffle, sortBy } from "lodash";
import { graphql, useStaticQuery } from "gatsby";
import classnames from "classnames";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import ClickableBox from "clickable-box";
import Profile from "../components/profile";
import Layout from "../components/layout";
import FilterItem from "../components/filter-item";
import CountryFilterItem from "../components/country-filter-item";
import Nav from "../components/nav";
import Loader from "../components/loader";
import NoResultsFound from "../components/no-results-found";
import paginate from "../paginate";
import "@reach/dialog/styles.css";
import styles from "./index.module.scss";
import CloseIcon from "../icons/close";
import FilterIcon from "../icons/filter";
import Button from "../components/button";

const createId = value => {
  // replace all spaces with dash and lowercase
  return value.replace(/\s+/g, "-").toLowerCase();
};

const createCategory = (value, type, count) => {
  return {
    title: value,
    id: createId(value),
    categories: type === "categories",
    country: type === "country",
    features: type === "features",
    count
  };
};

const createLocationInCountry = (location, country) => {
  return {
    location: createId(location),
    country: createId(country)
  };
};

const App = () => {
  const categories = [];
  const countryAndLocations = [];

  const data = useStaticQuery(graphql`
    {
      allAirtable(filter: { table: { eq: "FORM"} } ) {
        edges {
          node {
            recordId
            data {
              categories: Vertical
              website: Website
              description: Description_of_your_store
              name: Name
              location: City_Town
              country: Country
              attachments: Attachments {
                url
              }
              hasRetailLocation: has_retail_location
              usesGiftCards: uses_giftcard
              photoDescription: photo_description
            }
          }
        }
        categories: group(field: data___Vertical) {
          fieldValue
          totalCount
        }
        countries: group(field: data___Country) {
          fieldValue
          totalCount
        }
        hasRetailLocation: group(field: data___has_retail_location) {
          fieldValue
          totalCount
        }
        usesGiftCards: group(field: data___uses_giftcard) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  const [isLoading, setIsLoading] = useState(true);
  const [visibleMerchants, setVisibleMerchants] = useState([]);

  const [selectedCountryFilter, setSelectedCountryFilter] = useState(null);
  const [selectedLocationFilters, setSelectedLocationFilters] = useState([]);
  const [selectedCategoriesFilters, setSelectedCategoriesFilters] = useState([]);

  const [isFilterListVisible, setIsFilterListVisible] = useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [currentPage, setCurrentPage] = useState(1);

  const profileContainerRef = useRef();

  const filterCategoryTypes = [
    { name: "Location", id: "country" },
    { name: "City/state", id: "location" },
    { name: "Categories", id: "categories" },
    { name: "More", id: "features"}
  ];

  // dynamically create categories from location and country fields in database
  // if this ever causes issue, revert back to manual creation of these categories
  // ---
  data.allAirtable.categories.map(airtableCategory => {
    const category = createCategory(airtableCategory.fieldValue, "categories", airtableCategory.totalCount);
    return categories.push(category);
  })
  // data.allAirtable.locations.map(location => {
  //   const category = createCategory(location.fieldValue, "location", location.totalCount);
  //   return categories.push(category);
  // });

  data.allAirtable.countries.map(country => {
    const category = createCategory(country.fieldValue, "country", country.totalCount);
    return categories.push(category);
  });
  // ---

  // create hash and relationship of countries and locations within countries
  // ---
  data.allAirtable.edges.map(edge => {
    const { location, country } = edge.node.data;

    if (location && country) {
      return countryAndLocations.push(createLocationInCountry(location, country));
    }
  });
  // ---

  // add special categories
  // ---
  categories.push(createCategory("Gift card only", "features", 1))
  categories.push(createCategory("Has retail location", "features", 1))
  // ---

  useEffect(() => {
    const shuffledDesigners = shuffle(data.allAirtable.edges);
    setVisibleMerchants(shuffledDesigners);
    setIsLoading(false);
  }, [data.allAirtable.edges]);

  const numDesignersPerPage = 52;
  const numPagesToShowInPagination = 10;

  function merchantBelongsToSelectedCountry(merchant) {
    if (!selectedCountryFilter) {
      return true
    }

    const { country } = merchant;

    return country ? createId(country) === selectedCountryFilter : null
  }

  function merchantBelongsToSelectedCategories(merchant) {
    if (!selectedCategoriesFilters.length) {
      return true;
    }

    const { categories } = merchant;

    const categoryIds = categories.map(category => createId(category))
    return categoryIds.length
        ? selectedCategoriesFilters.some(filter => categoryIds.includes(filter))
        : null;
  }

  const filteredMerchants = visibleMerchants.filter(merchant => {
    if (!selectedCategoriesFilters.length && !selectedCountryFilter) {
      return true;
    }

    return merchantBelongsToSelectedCategories(merchant.node.data) && 
      merchantBelongsToSelectedCountry(merchant.node.data, selectedCountryFilter);
  });

  const pagination = paginate(
    filteredMerchants.length,
    currentPage,
    numDesignersPerPage,
    numPagesToShowInPagination
  );

  // ideally these should all be their own components
  const categoryFilters = (
    <div
      className={classnames({
        [styles.filterContainer]: true,
        [styles.filterListVisible]: isFilterListVisible
      })}
    >
      {filterCategoryTypes.map(section => {
        const categoriesInSection = categories.filter(c => c[section.id]);
        const sortedCategoriesInSection = sortBy(
          categoriesInSection,
          category => category.title
        );

        // hide location filters if country not selected
        if (section.id === "location") {
          return null;
        }

        return (
          <div key={section.id}>
            <fieldset>
              <legend><h3 className={styles.filterCategoryTitle}>{section.name}</h3></legend>
              {sortedCategoriesInSection.map(category => {
                if (category.location) {
                  // show locations for selected country only
                  const selectedCountryAndLocationObj = countryAndLocations.find(
                    obj => obj.location === category.id
                  );

                  if (selectedCountryFilter !== selectedCountryAndLocationObj.country) {
                    return null;
                  }
                }

                return category.country ? (
                  <CountryFilterItem
                    key={category.id}
                    id={category.id}
                    type="row"
                    onChange={e => {
                      const categoryId = e.target.value;

                      setSelectedCountryFilter(categoryId);
                      setSelectedLocationFilters([]);

                      setCurrentPage(1);
                    }}
                    onClick={e => {
                      const categoryId = e.target.value;

                      // deselect country when clicked again
                      if (categoryId === selectedCountryFilter) {
                        setSelectedCountryFilter(null);
                        setSelectedLocationFilters([]);
                        setCurrentPage(1);
                      }
                    }}
                    isChecked={selectedCountryFilter === category.id}
                    className={styles.filterItemInput}
                    title={category.title}
                    count={category.count}
                  />
                ) : (
                  <FilterItem
                    key={category.id}
                    id={category.id}
                    type="row"
                    onChange={e => {
                      const categoryId = e.target.value;
                      const isChecked = e.target.checked;

                      if (category.location) {
                        const newSelectedLocationFilters = [...selectedLocationFilters];

                        if (isChecked) {
                          newSelectedLocationFilters.push(categoryId);
                        } else {
                          const i = newSelectedLocationFilters.indexOf(categoryId);
                          newSelectedLocationFilters.splice(i, 1);
                        }

                        setSelectedLocationFilters(newSelectedLocationFilters);
                      }

                      if (category.categories) {
                        const newSelectedCategoryFilters = [...selectedCategoriesFilters];

                        if (isChecked) {
                          newSelectedCategoryFilters.push(categoryId);
                        } else {
                          const i = newSelectedCategoryFilters.indexOf(categoryId);
                          newSelectedCategoryFilters.splice(i, 1);
                        }

                        setSelectedCategoriesFilters(newSelectedCategoryFilters);
                      }

                      setCurrentPage(1);
                    }}
                    isChecked={selectedCategoriesFilters.includes(category.id)}
                    className={styles.filterItemInput}
                    title={category.title}
                    count={category.count}
                  />
                );
              })}
            </fieldset>
          </div>
        );
      })}
    </div>
  );

  const filterButton = (
    <div className={styles.filterButtonContainer}>
      <Button
        type="button"
        onClick={open}
        fullWidth={false}
        style={{
          backgroundColor: "#6362fc",
          borderRadius: "8px",
          boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)"
        }}
      >
        <FilterIcon /> Filter
        {selectedCountryFilter && (
          <>
            <span>·</span> <span>{1 + selectedLocationFilters.length}</span>
          </>
        )}
      </Button>
    </div>
  );

  const pageBody = !filteredMerchants.length ? (
    <>
      <NoResultsFound />
      {filterButton}
    </>
  ) : (
    <>
      <div
        className={classnames({
          [styles.profiles]: true
        })}
      >
        {filteredMerchants.map(({ node: merchant }, i) => {
          if (i < pagination.startIndex || i > pagination.endIndex) {
            return null;
          }

          const { recordId } = merchant;
          const { 
            name, 
            website, 
            location, 
            country, 
            attachments, 
            description, 
            categories,
            usesGiftCards,
            photoDescription
          } = merchant.data;

          // Add a published to airtable and check below

          if (recordId == null || merchant == null || attachments == null) {
            return null;
          }

          return (
            <Profile
              key={merchant.recordId}
              image={attachments[0].url}
              name={name}
              description={description}
              location={location}
              country={country}
              websiteUrl={website}
              categories={categories}
              usesGiftCards={usesGiftCards}
              photoDescription={photoDescription}
            />
          );
        })}
      </div>

      <div className={styles.paginationContainer}>
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
            profileContainerRef.current.scrollTo(0, 0);
          }}
          disabled={pagination.currentPage === pagination.startPage}
          type="button"
          className={styles.paginationArrow}
        >
          ←
        </button>
        <button
          className={styles.pageNumberButton}
          onClick={() => {
            setCurrentPage(1);
            profileContainerRef.current.scrollTo(0, 0);
          }}
          type="button"
          disabled={pagination.currentPage === 1}
        >
          1
        </button>
        {currentPage >= numPagesToShowInPagination && <>&hellip;</>}
        {pagination.pages.map(pageNumber => {
          // Skip over these page numbers because they'll always appear
          // in the pagination.
          if (pageNumber === 1 || pageNumber === pagination.totalPages) {
            return null;
          }

          return (
            <button
              key={pageNumber}
              className={styles.pageNumberButton}
              onClick={() => {
                setCurrentPage(pageNumber);
                profileContainerRef.current.scrollTo(0, 0);
              }}
              disabled={pagination.currentPage === pageNumber}
              type="button"
            >
              {pageNumber}
            </button>
          );
        })}
        {currentPage <= pagination.totalPages - (numPagesToShowInPagination + 1) && (
          <>&hellip;</>
        )}
        {pagination.totalPages !== 1 && (
          <button
            className={styles.pageNumberButton}
            onClick={() => {
              setCurrentPage(pagination.totalPages);
              profileContainerRef.current.scrollTo(0, 0);
            }}
            type="button"
            disabled={pagination.currentPage === pagination.totalPages}
          >
            {pagination.totalPages}
          </button>
        )}
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
            profileContainerRef.current.scrollTo(0, 0);
          }}
          disabled={pagination.currentPage === pagination.endPage}
          type="button"
          className={styles.paginationArrow}
        >
          →
        </button>
      </div>
      {filterButton}
    </>
  );

  const dialogOverlay = (
    <div>
      <DialogOverlay isOpen={showDialog} onDismiss={close}>
        <DialogContent>
          <div className={styles.dialogHeader}>
            <ClickableBox className={styles.closeButton} onClick={close}>
              <span aria-hidden>
                <CloseIcon />
              </span>
            </ClickableBox>
            <h2>Filter</h2>
            <button
              onClick={() => {
                setSelectedCountryFilter(null);
                setSelectedLocationFilters([]);
                setCurrentPage(1);
              }}
              className={styles.filterClear}
              type="button"
              style={{ marginRight: "16px" }}
            >
              Clear
            </button>
          </div>
          <div className={styles.dialogBody}>
            {filterCategoryTypes.map(section => {
              const categoriesInSection = categories.filter(c => c[section.id]);
              const sortedCategoriesInSection = sortBy(
                categoriesInSection,
                category => category.title
              );

              // hide location filters if country not selected
              if (section.id === "location") {
                return null;
              }

              return (
                <div key={section.id}>
                  <fieldset>
                    <legend><h3 className={styles.filterCategoryTitle}>{section.name}</h3></legend>
                    {sortedCategoriesInSection.map(category => {
                      if (category.location) {
                        // show locations for selected country only
                        const selectedCountryAndLocationObj = countryAndLocations.find(
                          obj => obj.location === category.id
                        );

                        if (
                          selectedCountryFilter !== selectedCountryAndLocationObj.country
                        ) {
                          return null;
                        }
                      }

                      return category.country ? (
                        <CountryFilterItem
                          key={category.id}
                          id={category.id}
                          type="pill"
                          onChange={e => {
                            const categoryId = e.target.value;

                            setSelectedCountryFilter(categoryId);
                            setCurrentPage(1);
                          }}
                          onClick={e => {
                            const categoryId = e.target.value;

                            // deselect country when clicked again
                            if (categoryId === selectedCountryFilter) {
                              setSelectedCountryFilter(null);
                              setCurrentPage(1);
                            }
                          }}
                          isChecked={selectedCountryFilter === category.id}
                          className={styles.filterItemInput}
                          title={category.title}
                          count={category.count}
                        />
                      ) : (
                        <FilterItem
                          key={category.id}
                          id={category.id}
                          type="pill"
                          onChange={e => {
                            const categoryId = e.target.value;
                            const isChecked = e.target.checked;

                            if (category.location) {
                              const newSelectedLocationFilters = [
                                ...selectedLocationFilters
                              ];

                              if (isChecked) {
                                newSelectedLocationFilters.push(categoryId);
                              } else {
                                const i = newSelectedLocationFilters.indexOf(categoryId);
                                newSelectedLocationFilters.splice(i, 1);
                              }

                              setSelectedLocationFilters(newSelectedLocationFilters);
                            }

                            if (category.categories) {
                              const newSelectedCategoryFilters = [...selectedCategoriesFilters];
        
                              if (isChecked) {
                                newSelectedCategoryFilters.push(categoryId);
                              } else {
                                const i = newSelectedCategoryFilters.indexOf(categoryId);
                                newSelectedCategoryFilters.splice(i, 1);
                              }
        
                              setSelectedCategoriesFilters(newSelectedCategoryFilters);
                            }

                            setCurrentPage(1);
                          }}
                          isChecked={selectedCategoriesFilters.includes(category.id)}
                          className={styles.filterItemInput}
                          title={category.title}
                          count={category.count}
                        />
                      );
                    })}
                  </fieldset>
                </div>
              );
            })}
          </div>
          <div className={styles.dialogFooter}>
            <Button type="button" onClick={close}>
              Apply filter
            </Button>
          </div>
        </DialogContent>
      </DialogOverlay>
    </div>
  );

  return (
    <Layout>
      <div className={styles.container}>
        <a href="#mainContent" className={styles.skipLink}>Skip to main content</a>
        <div className={styles.sidebar}>
          <Nav
            filter
            toggleFilterList={() => {
              setIsFilterListVisible(!isFilterListVisible);
            }}
            isLoading={isLoading}
          />

          {categoryFilters}
        </div>
        <main
          id="mainContent"
          className={classnames({
            [styles.main]: true,
            [styles.slide]: isFilterListVisible
          })}
          ref={profileContainerRef}
        >
          {isLoading ? <Loader /> : pageBody}
          {dialogOverlay}
        </main>
      </div>
    </Layout>
  );
};

export default App;
