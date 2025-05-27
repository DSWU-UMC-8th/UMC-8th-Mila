export interface Tag {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface Lp {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: string;
  likes: { id: number }[];
}

export interface LpDetail extends Lp {
  author: Author;
}

export interface LpListResponse {
  data: {
    data: Lp[];
    hasNext: boolean;
    nextCursor: number;
  };
}

export interface ResponseLpListDto {
  data: {
    data: Lp[];
    hasNext: boolean;
    nextCursor: number;
  };
}
