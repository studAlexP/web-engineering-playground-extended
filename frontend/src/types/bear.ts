interface BearResponse {
  type: string;
  coat: string;
  size: string;
  habitat: string;
  lifespan: string;
  diet: string;
}

export interface BearTableProps {
  bears: BearResponse[];
}

export interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}
