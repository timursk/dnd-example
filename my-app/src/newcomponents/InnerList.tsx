import React from 'react'
import InnerQuoteList from './InnerQuoteList';

type Props = {
  quotes: any;
  dropProvided: any;
}

const InnerList = ({quotes, dropProvided}: Props) => {

  return (
    <div>
      {'info'}

      <div ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />

        {dropProvided.placeholder}
      </div>
    </div>
  )
}

export default InnerList