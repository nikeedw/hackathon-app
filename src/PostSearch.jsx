import React from 'react';
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostSearch = () => {
	const posts = useStoreState((state) => state.posts);
	const search = useStoreState((state) => state.search);
	const setSearch = useStoreActions((actions) => actions.setSearch);
	const setSearchResults = useStoreActions((actions) => actions.setSearchResults);

	useEffect(() => {
		const filteredResults = posts.filter((post) =>
			((post.body).toLowerCase()).includes(search.toLowerCase())
			|| ((post.title).toLowerCase()).includes(search.toLowerCase()));

		setSearchResults(filteredResults.reverse());
	}, [posts, search, setSearchResults])

	return (
		<form className="searchForm" onSubmit={(e) => e.preventDefault()}>
			<label htmlFor="search">Search posts</label>
			<input
				className="customInput"
				id="search"
				type="text"
				placeholder="Search Posts"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</form>
	)
}

export default PostSearch;