<template>
		<div class="message" :class="message.senderType.toLowerCase()">
				<span class="message-text">{{ message.text }}</span>
		</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from "vue-property-decorator";
	import {Message, SenderType} from "@/lib/types";

	@Component
	export default class ChatMessage extends Vue {
		@Prop() private message!: Message;
	}
</script>

<style scoped lang="sass">
	@import "./Message"
</style>