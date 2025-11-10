import React from "react";
import { Pagination } from "antd";
import '../../styles/PaginationBar.scss';


const PaginationBar = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div  className="pagination-container">
      <Pagination
        current={currentPage}
        total={totalPages * 10} 
        showSizeChanger={false}
        onChange={onPageChange}
        showQuickJumper
      />
    </div>
  );
};

export default PaginationBar;
