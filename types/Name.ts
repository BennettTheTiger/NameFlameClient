type NamePopularity = {
    males: number;
    females: number;
}

export type Name = {
    name: string;
    description: string;
    gender: string;
    popularity: {
        [year: number]: NamePopularity
    }
};
