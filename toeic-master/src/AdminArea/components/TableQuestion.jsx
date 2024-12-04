import React, { useState, useEffect } from 'react';

const TableQuestions = ({ onEdit, onDelete }) => {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchQuestions(page);
    }, [page]);

    const fetchQuestions = async (page) => {
        try {
            const response = await fetch(`http://localhost:3000/api/questions/paging?page=${page}&pageSize=10`);
            const data = await response.json();
            setQuestions(data);
            setTotalPages(Math.ceil(data.total / 10)); // giả định API trả `total` số câu hỏi
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this question?')) {
            await onDelete(id);
            fetchQuestions(page);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Question Text</th>
                        <th className="px-4 py-2 border">Level</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q) => (
                        <tr key={q.QuestionID}>
                            <td className="px-4 py-2 border">{q.QuestionID}</td>
                            <td className="px-4 py-2 border">{q.QuestionText}</td>
                            <td className="px-4 py-2 border">{q.Level}</td>
                            <td className="px-4 py-2 border">
                                <button className="text-blue-500 mr-2" onClick={() => onEdit(q)}>Edit</button>
                                <button className="text-red-500" onClick={() => handleDelete(q.QuestionID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button
                    className="px-4 py-2 bg-gray-200 rounded"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 rounded"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TableQuestions;
