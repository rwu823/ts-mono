export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Author = {
  __typename?: 'Author'
  books?: Maybe<Array<Maybe<Book>>>
  firstName?: Maybe<Scalars['String']>
  id: Scalars['Int']
  lastName?: Maybe<Scalars['String']>
}

export type Book = {
  __typename?: 'Book'
  title?: Maybe<Scalars['String']>
}

export type Emoji = {
  __typename?: 'Emoji'
  aliases?: Maybe<Array<Maybe<Scalars['String']>>>
  category?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  emoji?: Maybe<Scalars['String']>
  ios_version?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  unicode_version?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  author?: Maybe<Author>
  book?: Maybe<Book>
  emojis?: Maybe<Array<Maybe<Emoji>>>
  ok?: Maybe<Scalars['Boolean']>
  twFuture?: Maybe<TwFuture>
  users?: Maybe<Array<Maybe<User>>>
}

export type QueryTwFutureArgs = {
  isNight?: InputMaybe<Scalars['Boolean']>
}

export type TwFuture = {
  __typename?: 'TWFuture'
  Change?: Maybe<Scalars['Int']>
  ChangePercent?: Maybe<Scalars['Float']>
  Close?: Maybe<Scalars['Int']>
  CommodityId?: Maybe<Scalars['String']>
  High?: Maybe<Scalars['Int']>
  Id?: Maybe<Scalars['String']>
  Low?: Maybe<Scalars['Int']>
  Market?: Maybe<Scalars['Int']>
  Mean60Distance?: Maybe<Scalars['Float']>
  Name?: Maybe<Scalars['String']>
  Open?: Maybe<Scalars['Int']>
  PreviousClose?: Maybe<Scalars['Int']>
  Time?: Maybe<Scalars['String']>
  TotalVolume?: Maybe<Scalars['Int']>
}

/** Users's description */
export type User = {
  __typename?: 'User'
  /** user's age */
  age?: Maybe<Scalars['Int']>
  friends?: Maybe<Array<Maybe<User>>>
  name: Scalars['String']
}
