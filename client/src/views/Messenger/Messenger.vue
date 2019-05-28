<template>
		<div class="messenger">
				<div class="messenger-body">
						<ChatMessage
							v-for="(message, index) in messages"
							:message="message"
							:key="index"
						/>
				</div>
				<div class="message-input-container">
						<div class="message-input-items">
								<div class="message-input">
										<input
												type="text"
												placeholder="Send a Message"
												ref="message"
												v-model="userMessage"
												@keypress="checkEnter"
										>
								</div>
								<div class="message-button">
										<button>Send</button>
								</div>
						</div>
				</div>
		</div>
</template>

<script lang="ts">
	import {Component, Vue} from "vue-property-decorator";
	import io from "socket.io-client";
	import ChatMessage from "./Message.vue";
	import {Message, SenderType} from "@/lib/types";

	const components = { ChatMessage };

	@Component({ components })
	export default class Messenger extends Vue {
		public userMessage: string = "";
		public messages: Message[] = [];

		public created()
		{
			this.messages.push(
				{senderType: SenderType.Sent, text: "Hello!"},
				{senderType: SenderType.Received, text: "Well, hey there"},
			);


		}

		public checkEnter(event: KeyboardEvent)
		{
			if (event.key === "Enter" && !event.shiftKey)
			{
				console.log(`Sending Message: ${this.userMessage}`);
				this.sendMessage();
			}
		}

		public sendMessage(): void
		{
			this.messages.push({
				senderType: SenderType.Sent,
				text: this.userMessage,
			});

			this.userMessage = "";
		}
	}
</script>

<style scoped lang="sass">
		@import "./Messenger"
</style>