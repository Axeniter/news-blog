import React, { useState, useEffect } from "react";
import { articlesAPI } from "../api/services";
import ArticleCard from "../components/ArticleCard";
import "./Articles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    sort: "date_desc",
  });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchArticles();
  }, [filters]);

  const fetchArticles = async () => {
    try {
      const response = await articlesAPI.getAll(filters);
      setArticles(response.data);
    } catch (err) {
      setError("Error loading articles");
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      category: searchInput.trim()
    }));
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setFilters({
      category: "",
      sort: "date_desc"
    });
  };

  const handleSortChange = (value) => {
    setFilters(prev => ({
      ...prev,
      sort: value
    }));
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await articlesAPI.delete(articleId);
      setArticles(articles.filter((article) => article.id !== articleId));
    } catch (err) {
      setError("Error deleting article");
    }
  };

  const hasActiveFilters = filters.category !== "";

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="articles-page">
      <div className="page-header">
        <h1>All Articles</h1>
        <p>Browse through our collection of news articles</p>
      </div>

      <div className="filters">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-group">
            <label htmlFor="category-search">Search by category:</label>
            <div className="search-input-container">
              <input
                id="category-search"
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Enter category name..."
                className="search-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </div>
            {filters.category && (
              <div className="active-filter">
                Showing category: <strong>{filters.category}</strong>
                <button 
                  type="button" 
                  onClick={handleClearFilters}
                  className="clear-filter"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </form>

        <div className="filter-group">
          <label htmlFor="sort">Sort by date:</label>
          <select
            id="sort"
            value={filters.sort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="date_desc">Newest first</option>
            <option value="date_asc">Oldest first</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button 
            onClick={handleClearFilters}
            className="clear-all-filters"
          >
            Clear all filters
          </button>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      <div className="articles-list">
        {articles.length === 0 ? (
          <div className="no-articles">
            <h3>No articles found</h3>
            <p>
              {filters.category 
                ? `No articles found in category "${filters.category}"`
                : "No articles available at the moment"
              }
            </p>
            {filters.category && (
              <button onClick={handleClearFilters} className="clear-search">
                Show all articles
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="articles-count">
              Found {articles.length} article{articles.length !== 1 ? 's' : ''}
              {filters.category && ` in category "${filters.category}"`}
              {!filters.category && ` (sorted by ${filters.sort === 'date_desc' ? 'newest first' : 'oldest first'})`}
            </div>
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onDelete={handleDeleteArticle}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Articles;