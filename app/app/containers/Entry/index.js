import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNote, updateNote, unselectNote, updateFilter } from 'containers/Notes/actions'
import { createStructuredSelector } from 'reselect'
import { makeSelectSelectedNote } from 'containers/Notes/selector'
import TagList from './TagList'
import TextArea from './TextArea'
import styled from 'styled-components'

const TextEntryWrapper = styled.div`
    padding-top: 0.2rem;
`

class TextEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            tags: []
        }

        this.onKeyDown = this.onKeyDown.bind(this)
    }
    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown, false);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedNote !== nextProps.selectedNote && nextProps.selectedNote) {
            this.setState({
                text: nextProps.selectedNote.tags.join(' ') + '  ' + nextProps.selectedNote.text,
                tags: nextProps.selectedNote.tags
            })
        }
    }

    onCancel(e) {
        const { selectedNote, unselectNote, updateFilter } = this.props
        if (selectedNote) {
            unselectNote()

        }
        this.setState({
            text: '',
            tags: []
        })
        updateFilter('')
    }

    onChange(e) {
        const { selectedNote, updateFilter } = this.props
        let input_content = e.target.value
        let split = input_content.split(/\s\s|;\s|;/g)
        let tag_str = split[0].replace(/^[\s,]+|[\s,]+$/g, '')
        let new_tags = []
        if (tag_str != "") {
            new_tags = tag_str.split(/\s|,\s|,/g)
        }
        this.setState({
            text: input_content,
            tags: new_tags
        })

        if (!selectedNote) {
            updateFilter(input_content)
        }
    }

    onKeyPress(e) {
        const { text, tags } = this.state
        const { selectedNote, addNote, updateNote, unselectNote, updateFilter } = this.props
        if (e.key === 'Enter') {
            e.preventDefault();
            if (text !== '' && tags.length > 0) {
                const newNote = {
                    text: text.replace(new RegExp(tags.join(' ') + '\\s*'), ''),
                    tags,
                }
                if (selectedNote) {
                    updateNote(selectedNote, newNote)
                } else {
                    addNote(newNote)
                }
            }
            this.setState({
                text: '',
                tags: []
            })
            updateFilter('')
        }
    }

    onKeyDown(e) {
        if (e.keyCode === 27) {
            this.onCancel()
        }
    }

    render() {
        let { text, tags } = this.state
        return (
            <TextEntryWrapper>
                <TagList tags={tags} />
                <TextArea
                    autoFocus
                    placeholder="Enter note"
                    onKeyPress={this.onKeyPress.bind(this)}
                    onChange={this.onChange.bind(this)}
                    value={text}>
                </TextArea>
            </TextEntryWrapper>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    selectedNote: makeSelectSelectedNote()
})

const mapDispatchToProps = dispatch => ({
    addNote: note => dispatch(addNote(note)),
    updateNote: (note, newNote) => dispatch(updateNote(note, newNote)),
    unselectNote: () => dispatch(unselectNote()),
    updateFilter: text => dispatch(updateFilter(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(TextEntry)