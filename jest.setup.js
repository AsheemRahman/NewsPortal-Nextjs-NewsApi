import '@testing-library/jest-dom';


jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        return <img {...props} />;
    },
}));


process.env = {
    ...process.env,
    NEXT_PUBLIC_NEWS_API_KEY: 'test-api-key',
};

if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: jest.fn(() => null),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        },
        writable: true,
    });
}