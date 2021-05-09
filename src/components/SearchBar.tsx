import { Input } from 'antd';

const { Search } = Input;

type SearchProps = {
  onSearchHandler: (input: string) => unknown;
};

export default function SearchBar(props: SearchProps) {
  return (
    <div className="px-24 py-8 flex flex-col flex-grow justify-center rounded-3xl bg-gradient-to-b from-green-300 via-blue-400 to-purple-400">
      <h2 className="font-bold text-5xl text-gray-700 mb-4">Search Movie</h2>
      <Search
        className="search-bar"
        placeholder="Enter a movie title..."
        onSearch={(input: string) => props.onSearchHandler(input)}
        enterButton
      />
    </div>
  );
}
