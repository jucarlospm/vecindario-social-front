import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render } from "@testing-library/react";
import CommentCard from "../components/CommentCard";

test('Render Content', () => {
    const comment = {
        email: 'test@vecindario.com',
        publication_date: '',
        title: 'Test title',
        content: 'Test content'
    }

    const component = render(<CommentCard comment={comment} />);
    component.getByText(comment.title)
    component.getByText(comment.title)
    component.getByText(comment.content)
});