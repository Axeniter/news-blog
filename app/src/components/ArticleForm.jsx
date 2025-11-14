import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ArticleForm.css";

const ArticleForm = ({ article, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        content: article.content || "",
        category: article.category || "",
      });
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      navigate("/articles");
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="article-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? "error" : ""}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={errors.category ? "error" : ""}
        />
        {errors.category && (
          <span className="error-text">{errors.category}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="10"
          className={errors.content ? "error" : ""}
        />
        {errors.content && <span className="error-text">{errors.content}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {article ? "Update article" : "Create article"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/articles")}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
