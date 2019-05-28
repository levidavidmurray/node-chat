<template>
		<div class="messenger">
				<div class="messenger-body">
						<ChatMessage
								v-for="(message, index) in messages"
								:message="message"
								:key="index"
						/>
						<TypingLoader class="typingLoader" v-if="isTyping"/>
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
												@input="sendTyping"
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
	import Socket = SocketIOClient.Socket;

	import {Message, SenderType} from "@/lib/types";
	import ChatMessage from "./Message.vue";
	import TypingLoader from "./TypingLoader.vue";

	const components = {ChatMessage, TypingLoader};

	@Component({components})
	export default class Messenger extends Vue {
		public userMessage: string = "";
		public messages: Message[] = [];
		public socket: Socket = null;
		public isTyping: boolean = false;

		public typingTimeout: any = null;

		public created()
		{
			this.socket = io("http://localhost:3000", { path: "/chat" });

			this.socket.on("MESSAGE", (message: Message) => {
				this.messages.push(message);
				this.isTyping = false;
			});

			this.socket.on("TYPING", (message: Message) => {
				this.isTyping = true;

				if (this.typingTimeout)
				{
					clearTimeout(this.typingTimeout);
				}

				this.typingTimeout = setTimeout(() => {
					this.isTyping = false;
					this.typingTimeout = null;
				}, 600)
			});
		}

		public sendMessage(): void
		{
			const message: Message = {
				senderType: SenderType.Received,
				text: this.userMessage,
			};

			this.messages.push({
				senderType: SenderType.Sent,
				text: message.text,
			});

			this.socket.emit("MESSAGE", message);
			this.userMessage = "";
		}

		public sendTyping(event): void
		{
			if (event.inputType !== "deleteContentBackward")
			{
				this.socket.emit("TYPING", true);
			}
		}

		public checkEnter(event: KeyboardEvent)
		{
			if (event.key === "Enter" && !event.shiftKey)
			{
				this.sendMessage();
			}
		}
	}
</script>

<style scoped lang="sass">
		@import "./Messenger"
</style>
