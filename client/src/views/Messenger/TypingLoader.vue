<template>
		<div id="wave">
				<span class="dot"></span>
				<span class="dot"></span>
				<span class="dot"></span>
		</div>
</template>

<script>
	export default {
		name: "TypingLoader",
	};
</script>

<style scoped lang="scss">
		$dot-active: #8C9CFB;
		$dot-passive: #D2D7FC;

		div#wave {
				position:relative;
				text-align:center;
				width: fit-content;

				.dot {
						display:inline-block;
						width:6px;
						height:6px;
						border-radius:50%;
						margin-right:3px;
						background:$dot-passive;
						animation: wave 1.1s linear infinite;

						&:nth-child(2) {
								animation-delay: -0.9s;
						}

						&:nth-child(3) {
								animation-delay: -0.7s;
						}
				}
		}

		@keyframes wave {
				0%, 60%, 100% {
						transform: initial;
						background: $dot-passive;
				}

				30% {
						transform: translateY(-5px);
						background: $dot-active;
				}
		}
</style>
