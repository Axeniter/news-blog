import React, { useState, useEffect } from "react";
import { articlesAPI } from "../api/services";
import ArticleCard from "../components/ArticleCard";
import "./Home.css";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await articlesAPI.getAll({
        sort: "date_desc",
        category: "",
      });
      setArticles(response.data.slice(0, 6));
    } catch (err) {
      setError("Error loading articles");
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await articlesAPI.delete(articleId);
      setArticles(articles.filter((article) => article.id !== articleId));
    } catch (err) {
      setError("Error deleting article");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to ReactiveBlog</h1>
      </section>

      <section className="latest-articles">
        <h2>Latest articles</h2>
        {articles.length === 0 ? (
          <p>There are no articles yet</p>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onDelete={handleDeleteArticle}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
