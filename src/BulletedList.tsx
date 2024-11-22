import { CSSProperties, ChangeEvent, KeyboardEvent, useState } from 'react'

export const TadaList = () => {
	const [inputValue, setInputValue] = useState('')
	const [items, setItems] = useState<string[]>([])
	const [editingIndex, setEditingIndex] = useState<number>()
	const [editingValue, setEditingValue] = useState('')

	const addItem = () => {
		if (inputValue.trim()) {
			setItems([...items, inputValue.trim()])
			setInputValue('')
		}
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			addItem()
		}
	}

	const startEditing = (index: number) => {
		setEditingIndex(index)
		setEditingValue(items[index])
	}

	const saveEditing = () => {
		const updatedItems = [...items]
		if (editingValue.trim()) {
			if (editingIndex) {
				updatedItems[editingIndex] = editingValue.trim()
				updatedItems.splice(editingIndex + 1, 0, '')
				setEditingIndex(editingIndex + 1)
			}
			setItems(updatedItems)
			setEditingValue('')
			console.log(updatedItems)
		} else {
			if (editingIndex) updatedItems.splice(editingIndex, 1)
			setItems(updatedItems)
			setEditingIndex(undefined)
			setEditingValue('')
		}
	}

	const handleEditingChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEditingValue(event.target.value)
	}

	const handleEditingKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			saveEditing()
		}
	}

	return (
		<div style={outerBoxStyles}>
			<h1>Things I'm Thinking About This Week...</h1>
			<input
				type='text'
				placeholder='Enter an item'
				value={inputValue}
				onChange={handleChange}
				onKeyUp={handleKeyPress}
				style={mainInputStyles}
			/>
			<button onClick={addItem} style={submitButtonStyles}>
				Add
			</button>
			<div style={itemsListStyles}>
				{items.map((item, index) =>
					editingIndex === index ? (
						<input
							key={`li-${index}`}
							type='text'
							value={editingValue}
							onChange={handleEditingChange}
							onKeyUp={handleEditingKeyPress}
							onBlur={saveEditing}
							autoFocus
							style={liInputStyles}
						/>
					) : (
						<span
							key={`li-${index}`}
							onClick={() => startEditing(index)}
							style={liItemStyles}>
							{item}
						</span>
					)
				)}
			</div>
		</div>
	)
}

const itemsListStyles: CSSProperties = {
	marginTop: '20px',
	padding: '0',
	display: 'flex',
	flexDirection: 'column',
}

const mainInputStyles: CSSProperties = {
	padding: '10px',
	width: '80%',
	marginBottom: '10px',
	borderRadius: '5px',
	border: '1px solid #ccc',
}

const liInputStyles: CSSProperties = {
	padding: '5px',
	width: '100%',
	boxSizing: 'border-box',
	borderRadius: '5px',
	border: '1px solid #ccc',
}

const liItemStyles: CSSProperties = { cursor: 'pointer', margin: '5px' }

const outerBoxStyles: CSSProperties = {
	padding: '20px',
	maxWidth: '600px',
	margin: '0 auto',
}

const submitButtonStyles: CSSProperties = {
	padding: '10px 20px',
	marginLeft: '10px',
	borderRadius: '5px',
	border: 'none',
	backgroundColor: '#007bff',
	color: 'white',
	cursor: 'pointer',
}
