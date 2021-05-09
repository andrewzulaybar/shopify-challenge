export enum MovieType {
  Episode = 'episode',
  Series = 'series',
  Movie = 'movie',
}

export interface MovieDTO {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: MovieType;
  Year: string;
}

export interface Query {
  dataType?: 'json' | 'xml';
  page?: number;
  title: string;
  type?: MovieType;
  year?: number;
}

interface JSONResponse {
  Response: string;
  Search: MovieDTO[];
  totalResults: string;
}

export default class OMDB {
  private readonly baseUrl = 'http://www.omdbapi.com/?i=tt3896198&';
  private readonly queryParams: URLSearchParams;

  public constructor() {
    this.queryParams = new URLSearchParams({
      apikey: process.env.NEXT_PUBLIC_API_KEY,
    });
  }

  public async findMovie(query: Query) {
    const apiUrl = this.constructApiUrl(query);
    return fetch(apiUrl)
      .then((res: Response) => res.json())
      .then((res: JSONResponse) => res.Search)
      .catch(() => []);
  }

  private constructApiUrl(query: Query): string {
    if (!query) {
      throw new Error('Query parameter is missing');
    }

    const params = this.queryParams;
    const { dataType, page, title, type, year } = query;

    if (type) {
      params.set('r', type);
    }
    if (title) {
      params.set('s', title);
    }
    if (dataType) {
      params.set('t', dataType);
    }
    if (page) {
      params.set('page', `${page}`);
    }
    if (year) {
      params.set('y', `${year}`);
    }

    return this.baseUrl + params.toString();
  }
}
