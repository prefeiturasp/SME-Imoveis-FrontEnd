import React from 'react'

export class FileUpload extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    const { input: { onChange } } = this.props
    if (e.target.files[0]) {
      onChange(e.target.files[0])
    }
  }

  render () {
    const {
      input: { value, ...inputProps },
      className,
      id,
      accept
    } = this.props
    return (
      <input
        type='file'
        value={undefined}
        onChange={this.onChange}
        className={className}
        id={id}
        {...inputProps}
        accept={accept}
      />
    )
  }
}