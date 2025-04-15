export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  tagline: string;
}

export interface Credit {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
}

export interface CreditsResponse {
  cast: Credit[];
  crew: Credit[];
}
