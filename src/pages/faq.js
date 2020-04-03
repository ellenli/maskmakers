import React from 'react';
import 'reset-css';
import { Helmet } from 'react-helmet';
import Nav from '../components/nav';
import styles from './faq.module.scss';
import Layout from '../components/layout';

const Faq = () => (
	<Layout>
		<Helmet title="FAQ" />
		<div className={styles.container}>
			<div className={styles.sidebar}>
				<Nav theme="light" />
			</div>
			<div className={styles.main}>
				<h1 className={styles.pageTitle}>FAQ</h1>
				<div className={styles.questionContainer}>
					<p className={styles.question}>
						How do we know these masks are safe?
					</p>
					<p className={styles.answer}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>

				<div className={styles.questionContainer}>
					<p className={styles.question}>
						How can I be added to the directory?
					</p>
					<p className={styles.answer}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>

				<div className={styles.questionContainer}>
					<p className={styles.question}>When was this page last updated?</p>
					<p className={styles.answer}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>

				<div className={styles.questionContainer}>
					<p className={styles.question}>
						If my information changed, how do I update it?{' '}
					</p>
					<p className={styles.answer}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>

				<div className={styles.questionContainer}>
					<p className={styles.question}>Can I promote this?</p>
					<p className={styles.answer}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
			</div>
		</div>
	</Layout>
);

export default Faq;
