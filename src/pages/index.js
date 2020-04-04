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
import Nav from "../components/nav";
import Loader from "../components/loader";
import paginate from "../paginate";
import "@reach/dialog/styles.css";
import styles from "./index.module.scss";
import CloseIcon from "../icons/close";
import FilterIcon from "../icons/filter";
import Button from "../components/button";

const createCategory = (value, type, count) => {
  return {
    title: value,
    id: value.toLowerCase(),
    location: type === "location",
    country: type === "country",
    count
  };
};

const App = () => {
  const categories = [];

  const data = useStaticQuery(graphql`
    {
      allAirtable(filter: { table: { eq: "providers" } }) {
        edges {
          node {
            recordId
            data {
              name
              websiteUrl
              location
              country
              show
              photo {
                url
              }
            }
          }
        }
        locations: group(field: data___location) {
          fieldValue
          totalCount
        }
        countries: group(field: data___country) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  const [isLoading, setIsLoading] = useState(true);
  const [visibleDesigners, setVisibleDesigners] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isFilterListVisible, setIsFilterListVisible] = useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [currentPage, setCurrentPage] = useState(1);

  const profileContainerRef = useRef();

  const filterCategoryTypes = [
    { name: "Country", id: "country" },
    { name: "Location", id: "location" }
  ];

  // dynamically create categories from location and country fields in database
  // if this ever causes issue, revert back to manual creation of these categories
  // ---
  data.allAirtable.locations.map(location => {
    const category = createCategory(location.fieldValue, "location", location.totalCount);
    return categories.push(category);
  });

  data.allAirtable.countries.map(country => {
    const category = createCategory(country.fieldValue, "country", country.totalCount);
    return categories.push(category);
  });
  // ---

  useEffect(() => {
    const shuffledDesigners = shuffle(data.allAirtable.edges);
    setVisibleDesigners(shuffledDesigners);
    setIsLoading(false);
  }, [data.allAirtable.edges]);

  const numDesignersPerPage = 52;
  const numPagesToShowInPagination = 5;

  const filteredDesigners = visibleDesigners.filter(designer => {
    if (selectedFilters.length === 0) {
      return true;
    }

    return selectedFilters.some(filter => {
      const { location, country } = designer.node.data;
      if (location && country) {
        return location.toLowerCase() === filter || country.toLowerCase() === filter;
      }

      return null;
    });
  });

  const pagination = paginate(
    filteredDesigners.length,
    currentPage,
    numDesignersPerPage,
    numPagesToShowInPagination
  );

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Nav
            filter
            toggleFilterList={() => {
              setIsFilterListVisible(!isFilterListVisible);
            }}
            isLoading={isLoading}
          />

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
              return (
                <div key={section.id}>
                  <h3 className={styles.filterCategoryTitle}>{section.name}</h3>
                  {sortedCategoriesInSection.map(category => {
                    return (
                      <FilterItem
                        key={category.id}
                        id={category.id}
                        type="row"
                        onChange={e => {
                          const categoryId = e.target.value;
                          const isChecked = e.target.checked;

                          const newSelectedFilters = [...selectedFilters];

                          if (isChecked) {
                            newSelectedFilters.push(categoryId);
                          } else {
                            const i = newSelectedFilters.indexOf(categoryId);
                            newSelectedFilters.splice(i, 1);
                          }

                          setSelectedFilters(newSelectedFilters);
                          setCurrentPage(1);
                        }}
                        isChecked={selectedFilters.includes(category.id)}
                        className={styles.filterItemInput}
                        title={category.title}
                        count={category.count}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={classnames({
            [styles.main]: true,
            [styles.slide]: isFilterListVisible
          })}
          ref={profileContainerRef}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div
                className={classnames({
                  [styles.profiles]: true
                })}
              >
                {filteredDesigners.map(({ node: designer }, i) => {
                  if (i < pagination.startIndex || i > pagination.endIndex) {
                    return null;
                  }

                  const { recordId } = designer;
                  const {
                    name,
                    websiteUrl,
                    location,
                    country,
                    show,
                    photo
                  } = designer.data;

                  if (recordId == null || designer == null || !show) {
                    return null;
                  }

                  return (
                    <Profile
                      key={designer.recordId}
                      image={photo[0].url}
                      name={name}
                      description={designer.data.description}
                      location={location}
                      country={country}
                      websiteUrl={websiteUrl}
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
                {currentPage <=
                  pagination.totalPages - (numPagesToShowInPagination + 1) && (
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
              <div className={styles.filterButtonContainer}>
                <Button type="button" onClick={open} fullWidth={false}>
                  <FilterIcon /> Filter
                  {selectedFilters.length > 0 && (
                    <>
                      <span>·</span> <span>{selectedFilters.length}</span>
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
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
                      setSelectedFilters([]);
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

                    return (
                      <div key={section.id}>
                        <h3 className={styles.filterCategoryTitle}>{section.name}</h3>
                        {sortedCategoriesInSection.map(category => (
                          <FilterItem
                            key={category.id}
                            id={category.id}
                            type="pill"
                            onChange={e => {
                              const categoryId = e.target.value;
                              const isChecked = e.target.checked;

                              const newSelectedFilters = [...selectedFilters];

                              if (isChecked) {
                                newSelectedFilters.push(categoryId);
                              } else {
                                const i = newSelectedFilters.indexOf(categoryId);
                                newSelectedFilters.splice(i, 1);
                              }

                              setSelectedFilters(newSelectedFilters);
                              setCurrentPage(1);
                            }}
                            isChecked={selectedFilters.includes(category.id)}
                            className={styles.filterItemInput}
                            title={category.title}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
                <div className={styles.dialogFooter}>
                  <Button type="button" onClick={close}>
                    View {filteredDesigners.length} designers
                  </Button>
                </div>
              </DialogContent>
            </DialogOverlay>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
