import React from 'react'
import uuid4 from 'uuid/v4'
import PropTypes from 'prop-types'
import Linkify from 'react-linkify'
import Tag from 'components/Tag'
import './styles.scss'

const Note = props => {
    const { note, onDelete, onSelect, active } = props
    const handleDelete = note => e => {
        onDelete(note)
        e.stopPropagation()
    }
    return (
        <div className={"note columns p-1 s-rounded" + (active ? ' active' : '')}
            onClick={() => onSelect(note)}>
            <div className="column col-auto">
                <div className="text-error c-hand"
                    onClick={handleDelete(note)}>
                    <i className="icon icon-cross" />
                </div>
            </div>
            <div className="column col-lg-auto">
                {note.tags && note.tags.map(tag =>
                    <Tag
                        key={uuid4()}
                        text={tag}
                    />
                )}
                <div className="d-inline text-thin">
                    <Linkify tagName="div" properties={{ target: '_blank' }}>
                        {note.text}
                    </Linkify>
                </div>
            </div>
        </div>
    )
}
Note.propTypes = {

}

export default Note