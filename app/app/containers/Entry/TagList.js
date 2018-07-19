import React from 'react'
import styled from 'styled-components'
import Tag from 'components/Tag'
import uuid4 from 'uuid/v4'

const TagListWrapper = styled.div`
  font-size: 1rem;
  margin: 1rem 0 0.5rem 0;
  min-height: 2rem;
`

let TagList = ({ tags }) => (
    <TagListWrapper>
        {tags.map(tag =>
            <Tag
                key={uuid4()}
                text={tag}
            />
        )}
    </TagListWrapper>
)

export default TagList