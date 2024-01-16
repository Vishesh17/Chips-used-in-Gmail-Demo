'use client'
// src/page.tsx
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react'
import Chip from './Chip'

const Page: React.FC = () => {
	const [inputValue, setInputValue] = useState<string>('')
	const [chips, setChips] = useState<string[]>([])
	const [history, setHistory] = useState<string[]>([])
	const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(
		null
	)
	const [validationError, setValidationError] = useState<string | null>(null)

	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setHistory(Array.from(new Set([...history, ...chips])))
	}, [chips])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
		setSelectedSuggestion(null)
		setValidationError(null)
	}

	const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && inputValue.trim() !== '') {
			if (isValidEmail(inputValue.trim())) {
				setChips([...chips, inputValue.trim()])
				setHistory([...history, inputValue.trim()]) // Add the new chip to history
				setInputValue('')
				setValidationError(null)
			} else {
				setValidationError('Invalid email ID')
			}
		} else if (
			event.key === 'Backspace' &&
			inputValue === '' &&
			chips.length > 0
		) {
			if (selectedSuggestion === null) {
				// If no suggestion is selected, highlight and select the last chip
				setSelectedSuggestion(chips.length - 1)
			} else {
				// If a suggestion is already selected, remove the highlighted chip
				setChips(chips.slice(0, -1))
				setSelectedSuggestion(null)
			}
		}
	}

	const handleChipRemove = (index: number) => {
		const newChips = [...chips]
		newChips.splice(index, 1)
		setChips(newChips)
	}

	const handleSuggestionClick = (suggestion: string) => {
		setChips([...chips, suggestion])
		setInputValue('')
		setValidationError(null)
		setSelectedSuggestion(null)
	}

	const handleSuggestionHover = (index: number) => {
		setSelectedSuggestion(index)
	}

	const isValidEmail = (email: string): boolean => {
		const atIndex = email.indexOf('@')
		if (atIndex === -1 || !email.includes('.')) {
			return false
		}

		const domain = email.slice(atIndex + 1)

		
		const validDomains = ['gmail.com', 'outlook.com', 'co.in'] // Add more valid domains as needed
		if (!validDomains.includes(domain.toLowerCase())) {
			return false
		}

		return true
	}

	return (
		<div className="p-4 relative">
			<div className="flex flex-wrap">
				{chips.map((chip, index) => (
					<Chip
						key={index}
						label={chip}
						onRemove={() => handleChipRemove(index)}
					/>
				))}
			</div>
			<input
				ref={inputRef}
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}
				placeholder="Add a recipient..."
				className={`p-2 mt-4 border ${
					validationError ? 'border-red-500' : 'border-gray-300'
				} rounded`}
			/>
			{validationError && (
				<p className="text-red-500">{validationError}</p>
			)}
			{inputValue !== '' && (
				<div className="absolute z-10 mt-2 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded shadow-md">
					<ul>
						{history
							.filter((item) =>
								item
									.toLowerCase()
									.includes(inputValue.toLowerCase())
							)
							.map((suggestion, index) => (
								<li
									key={index}
									onClick={() =>
										handleSuggestionClick(suggestion)
									}
									onMouseEnter={() =>
										handleSuggestionHover(index)
									}
									className={`p-2 cursor-pointer ${
										selectedSuggestion === index
											? 'bg-gray-200'
											: ''
									}`}
								>
									{suggestion}
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default Page
