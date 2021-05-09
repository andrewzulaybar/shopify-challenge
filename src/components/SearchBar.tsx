import { Input } from 'antd';

const { Search } = Input;

type SearchProps = {
  onSearchHandler: (input: string) => unknown;
};

export default function SearchBar(props: SearchProps) {
  return (
    <Search
      placeholder="Search movie by title..."
      onSearch={(input: string) => props.onSearchHandler(input)}
      enterButton
    />
  );
}
