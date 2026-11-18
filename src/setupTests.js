import '@testing-library/jest-dom';

// jsdom does not implement these; the app calls them on navigation/toast.
window.scrollTo = jest.fn();
