import React, { useEffect, useState } from 'react';
import useQuery from "../hooks/useQuery.js";
import useFetchList from "../hooks/useFetchList.js";
import useSearch from "../hooks/useSearch.js";
import "../App.css";

const ProductList = () => {
    const [params, updateParams, resetParams] = useQuery({
        search: "",
        skip: 0,
        limit: 12,
        sortBy: "",
        order: ""
    });

    const [products, loading, error] = useFetchList("products", params);

    const currentPage = Math.floor(params.skip / params.limit) + 1;

    const handlePage = (newPage) => {
        if (newPage < 1) return;
        updateParams({
            ...params,
            skip: (newPage - 1) * params.limit
        });
    };

    const handleLimit = (e) => {
        const newLimit = parseInt(e.target.value, 10);
        if (!isNaN(newLimit)) {
            updateParams({
                ...params,
                limit: newLimit,
                skip: 0,
            });
        }
    };

    const [search, setSearch] = useState(params.search);
    const debounceSearch = useSearch(search);

    useEffect(() => {
        updateParams({
            ...params,
            search: debounceSearch,
            skip: 0,
        });
    }, [debounceSearch]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSortPrice = (e) => {
        const sortPrice = e.target.value.toLowerCase();
        if (!sortPrice) {
            updateParams({
                ...params,
                order: "",
                sortBy: "",
                skip: 0,
            });
        } else {
            updateParams({
                ...params,
                order: sortPrice,
                sortBy: "price",
                skip: 0,
            });
        }
    };

    const handleSortTitle = (e) => {
        const sortPrice = e.target.value.toLowerCase();
        if (!sortPrice) {
            updateParams({
                ...params,
                order: "",
                sortBy: "",
                skip: 0,
            });
        } else {
            updateParams({
                ...params,
                order: sortPrice,
                sortBy: "title",
                skip: 0,
            });
        }
    };

    if (error) {
        return <div className="error">Error...</div>;
    }

    return (
        <div className="product-list-container">
            <div className="filters">
                <div className="search-container">
                    <input
                        value={search}
                        onChange={handleSearch}
                        type="text"
                        id="form1"
                        className="search-input"
                        placeholder="Tìm kiếm"
                    />
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                </div>

                <div className="sort-container">
                    <select onChange={handleSortPrice} className="sort-select" aria-label="Sort by price">
                        <option value="">Sắp xếp theo giá</option>
                        <option value="desc">Cao → Thấp</option>
                        <option value="asc">Thấp → Cao</option>
                    </select>
                </div>

                <div className="sort-container">
                    <select onChange={handleSortTitle} className="sort-select" aria-label="Sort by title">
                        <option value="">Sắp xếp theo tên</option>
                        <option value="desc">Từ z → a</option>
                        <option value="asc">Từ a → z</option>
                    </select>
                </div>
            </div>

            <div className="product-grid">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    products.map((item) => (
                        <div key={item.id} className="product-card">
                            <img src={item.thumbnail} className="product-image" alt={item.title} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-price">{item.price}</p>
                                <a href="#" className="card-button">Go somewhere</a>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="pagination-container">
                <nav aria-label="Pagination">
                    <ul className="pagination-list">
                        <li className="pagination-item">
                            <button
                                className="pagination-button"
                                onClick={() => handlePage(currentPage - 1)}
                                aria-label="Previous"
                                disabled={currentPage === 1}
                            >
                                «
                            </button>
                        </li>
                        <li className="pagination-item">
                            <span className="pagination-current">{currentPage}</span>
                        </li>
                        <li className="pagination-item">
                            <button
                                className="pagination-button"
                                onClick={() => handlePage(currentPage + 1)}
                                aria-label="Next"
                            >
                                »
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className="limit-selector">
                    <select
                        className="limit-select"
                        onChange={handleLimit}
                        value={params.limit}
                    >
                        <option disabled>Chọn số sản phẩm/trang</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProductList;