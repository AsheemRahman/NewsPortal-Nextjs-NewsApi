import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/News/SearchBar';


const mockPush = jest.fn();
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: mockPush
    })
}));


const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn()
};
Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
});


jest.mock('../../hooks/useLocalStorage', () => ({
    useLocalStorage: () => ['previous search', jest.fn()]
}));

describe('SearchBar Component', () => {
    beforeEach(() => {
        mockPush.mockClear();
        mockLocalStorage.getItem.mockClear();
        mockLocalStorage.setItem.mockClear();
    });

    test('renders search input and button', () => {
        render(<SearchBar />);
        expect(screen.getByPlaceholderText(/search news/i)).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('updates input value on change', () => {
        render(<SearchBar />);
        const input = screen.getByPlaceholderText(/search news/i);
        fireEvent.change(input, { target: { value: 'technology' } });
        expect(input.value).toBe('technology');
    });

    test('navigates to search page on form submission', () => {
        render(<SearchBar />);
        const input = screen.getByPlaceholderText(/search news/i);
        const form = screen.getByRole('button').closest('form');

        fireEvent.change(input, { target: { value: 'technology' } });
        fireEvent.submit(form);

        expect(mockPush).toHaveBeenCalledWith('/search?q=technology');
    });

    test('does not navigate when search term is empty', () => {
        render(<SearchBar />);
        const form = screen.getByRole('button').closest('form');

        fireEvent.submit(form);

        expect(mockPush).not.toHaveBeenCalled();
    });
});