import React from 'react';
import { useParams } from 'react-router-dom';
import Writing from './Writing'; // Adjust the import path as necessary
import Speaking from './Speaking'; // Adjust the import path as necessary
import Listening from './Listening'; // Adjust the import path as necessary
import Reading from './Reading'; // Adjust the import path as necessary

const LessonDetail = () => {
    const { id } = useParams(); // Get the lesson ID from the URL

    let content;
    switch (id) {
        case 'Writing':
            content = <Writing />;
            break;
        case 'Speaking':
            content = <Speaking />;
            break;
        case 'Listening':
            content = <Listening />;
            break;
        case 'Reading':
            content = <Reading />;
            break;
        default:
            content = <div>Lesson not found!</div>; // Handle invalid cases
    }

    return (
        <div className="p-5">
            {content}
        </div>
    );
};

export default LessonDetail;