import gql from "graphql-tag";
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import AddListing from "./AddListing";

const Description = styled.p`
  margin-bottom: 0;
`;

const Listing = styled.div`
  padding: 1rem 0;

  :not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.veryLightGrey};
  }
`;

const Title = styled.strong`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Wrapper = styled.div``;

const query = gql`
  {
    listings {
      description
      id
      title
    }
  }
`;

const Listings = () => {
    const { data, loading, refetch } = useQuery(query);
  
    if (loading) return "Loading...";
  
    return (
      <Wrapper>
        <div><h1>Listings:</h1></div>
        <div>
          {data.listings.map(listing => (
            <Listing key={listing.id}>
              <Title>{listing.title}</Title>
              <Description>{listing.description}</Description>
            </Listing>
          ))}
        </div>
        <AddListing onAddListing={() => { refetch(); }} />
      </Wrapper>
    );
  };
  
  export default Listings;