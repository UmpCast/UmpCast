/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetManagerSeasons
// ====================================================

export interface GetManagerSeasons_me_userPermit_managerPermitList_season_organization {
    id: string
    name: string
}

export interface GetManagerSeasons_me_userPermit_managerPermitList_season {
    id: string
    name: string
    organization: GetManagerSeasons_me_userPermit_managerPermitList_season_organization
}

export interface GetManagerSeasons_me_userPermit_managerPermitList {
    season: GetManagerSeasons_me_userPermit_managerPermitList_season
}

export interface GetManagerSeasons_me_userPermit {
    managerPermitList: GetManagerSeasons_me_userPermit_managerPermitList[]
}

export interface GetManagerSeasons_me {
    userPermit: GetManagerSeasons_me_userPermit
}

export interface GetManagerSeasons {
    me: GetManagerSeasons_me | null
}
