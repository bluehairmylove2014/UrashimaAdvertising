'use client';
import { SearchBoxProps } from '@mapbox/search-js-react/dist/components/SearchBox';

const CustomSearchBox = (props: SearchBoxProps) => {
  if (typeof window !== 'undefined') {
    const { SearchBox } = require('@mapbox/search-js-react');
    return <SearchBox {...props} />;
  } else {
    // Return a placeholder or null for server-side rendering
    return null;
  }
};

export default CustomSearchBox;
