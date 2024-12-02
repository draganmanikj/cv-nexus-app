import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import _ from 'lodash'
import {useSelector} from "react-redux";


class SQLEditor extends Component {

    constructor(props) {
        super(props);
        this.state={
            editor: undefined,
            cursor: undefined
        }
    }


    putTextOnCursor = (text)=>{
        const {editor,cursor} = this.state;
        if(cursor!==undefined)
        {
            editor.setSelection({line: cursor.line,ch: cursor.ch})
            editor.replaceSelection(text);
        }
        else
        {
            alert("Курсорот не е позициониран. Селектирајте позиција во едиторот.")
            // alert(translate("app.datasets.editor.cursorNotSet"))
        }
    }

    render() {
        var debouncedCallback = _.debounce((value)=>{this.props.onChange(value);},300);//za perfomansi

        return (
            <>
                <CodeMirror
                    value={this.props.SQLQuery}
                    options={{
                        readOnly: this.props.readOnly,
                        mode: 'text/x-sql',
                        theme: 'material',
                        indentWithTabs: true,
                        smartIndent: true,
                        lineNumbers: true,
                        matchBrackets : true,
                        autofocus: true,
                        extraKeys: {"Ctrl-Space": "autocomplete"},
                        hintOptions: {tables: {
                                users: ["name", "score", "birthDate"],
                                countries: ["name", "population", "size"]
                            }}
                    }}
                    onCursor={(editor, position)=>{
                        if(this.state.editor===undefined)
                            this.setState({editor:editor});

                        this.setState({cursor:position});

                    }}
                    onChange={(editor, data, value) => {

                        debouncedCallback(value);
                    }}
                />

                {this.state.cursor !== undefined ?
                    <>{"Курсор"}: L:{this.state.cursor.line} C:{this.state.cursor.ch}</>
                    :
                    <>{"Курсорот не е позициониран. Селектирајте позиција во едиторот."}</>
                }
            </>
        );
    }
}

SQLEditor.propTypes = {
    SQLQuery: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SQLEditor;