<div class="construction-container">
	<div class="construction-content">
		<div class="worker-icon">
			🚧👷‍♂️🚧
		</div>
		<h1>Under Construction</h1>
		<p>This website is currently being built. Please check back soon!</p>
		<p class="github-link">In the meantime, check out my <a href="https://github.com/nibrobb" target="_blank" rel="noopener noreferrer">GitHub</a> 🚀</p>
		<div class="progress-bar">
			<div class="progress-fill"></div>
		</div>
		<p class="progress-text">Progress: 25%</p>
	</div>
</div>

<style>
	.construction-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: linear-gradient(135deg, #ff9a00 0%, #ffad33 100%);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.construction-content {
		text-align: center;
		background: white;
		padding: 3rem;
		border-radius: 20px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		max-width: 500px;
		margin: 2rem;
	}

	.worker-icon {
		font-size: 4rem;
		margin-bottom: 1.5rem;
		animation: bounce 2s infinite;
	}

	h1 {
		color: #333;
		font-size: 2.5rem;
		margin-bottom: 1rem;
		font-weight: bold;
	}

	p {
		color: #666;
		font-size: 1.2rem;
		margin-bottom: 2rem;
		line-height: 1.5;
	}

	.github-link {
		margin-bottom: 1.5rem;
		font-size: 1.1rem;
	}

	.github-link a {
		color: #ff9a00;
		text-decoration: none;
		font-weight: bold;
		transition: all 0.3s ease;
		border-bottom: 2px solid transparent;
	}

	.github-link a:hover {
		color: #e68900;
		border-bottom: 2px solid #e68900;
		transform: translateY(-1px);
	}

	.progress-bar {
		width: 100%;
		height: 20px;
		background-color: #e0e0e0;
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.progress-fill {
		width: 25%;
		height: 100%;
		background: linear-gradient(90deg, #ff9a00, #ffad33);
		border-radius: 10px;
		animation: pulse 2s infinite;
	}

	.progress-text {
		color: #ff9a00;
		font-weight: bold;
		font-size: 1rem;
		margin-bottom: 0;
	}

	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
		60% {
			transform: translateY(-5px);
		}
	}

	@keyframes pulse {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
		100% {
			opacity: 1;
		}
	}

	@media (max-width: 640px) {
		.construction-content {
			padding: 2rem;
			margin: 1rem;
		}

		h1 {
			font-size: 2rem;
		}

		.worker-icon {
			font-size: 3rem;
		}

		p {
			font-size: 1rem;
		}
	}
</style>
