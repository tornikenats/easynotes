import React from 'react'
import uuid4 from 'uuid/v4'
import PropTypes from 'prop-types'
import Linkify from 'react-linkify'
import Tag from 'components/Tag'
import './styles.scss'

class Note extends React.Component {
    render() {
        const { note, onDelete, onSelect, active } = this.props
        return (
            <div className={"note columns p-1 s-rounded" + (active ? ' active' : '')}
                onClick={e => e.target !== this.deleteBtn && onSelect(note)}>
                <div className="column col-auto">
                    <div className="text-error c-hand"
                        innerRef={deleteBtn => this.deleteBtn = deleteBtn}
                        onClick={() => onDelete(note)}>
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
                    <div className="d-inline">
                        <Linkify tagName="div" properties={{ target: '_blank' }}>
                            {note.text}
                        </Linkify>
                    </div>
                </div>
            </div>
        )
    }
}
Note.propTypes = {

}

export default Note