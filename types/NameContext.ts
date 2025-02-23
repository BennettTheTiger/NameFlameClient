type ISODateString = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;

export type NameContextUser = {
    id: string,
    userName: string,
    firstName: string,
    lastName: string
}

export type NameContextMatch = {
    name: string
}

export type NameContext = {
    id: string,
    name: string
    description: string,
    createdAt: ISODateString,
    updatedAt: ISODateString,
    isOwner: boolean,
    noun: string,
    matches: NameContextMatch[],
    participants: NameContextUser[]
}