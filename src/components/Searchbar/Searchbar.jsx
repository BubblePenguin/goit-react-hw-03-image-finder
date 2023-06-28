import css from './Searchbar.css';

const Searchbar = ({ onSubmit, onChange, queue }) => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={queue}
          name="queue"
          onChange={onChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
