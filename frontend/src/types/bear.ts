export interface Bear {
  type: string;
  coat: string;
  size: string;
  habitat: string;
  lifespan: string;
  diet: string;
}

export interface BearTableProps {
  bears: Bear[];
}
