import { Input } from 'antd';

const { Search } = Input;

type SearchProps = {
  onSearchHandler: (input: string) => unknown;
};

export default function SearchBar(props: SearchProps) {
  return (
    <div className="px-24 py-24 flex flex-col flex-grow justify-center rounded-3xl bg-gradient-to-b from-yellow-300 via-red-400 to-pink-400">
      <h2 className="font-bold text-5xl text-gray-700 mb-4">Search Movies</h2>
      <Search
        className="search-bar"
        placeholder="Enter a movie title..."
        onSearch={(input: string) => props.onSearchHandler(input)}
        enterButton
      />
    </div>
  );
}
