<template>
  <div
    class="flex flex-row items-start p-4 bg-white border border-gray-200 rounded-md"
  >
    <div id="message-avatar" class="flex">
      <el-image class="w-10 rounded-md" :src="avatar" />
    </div>
    <div id="message-content" class="mx-4">
      <div v-html="chatContentRandered"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked";
import DOMPurify from "dompurify";
import highlight from "highlight.js";
import "highlight.js/styles/idea.css";

const props = defineProps({
  role: {
    type: String,
    required: true,
  },
  chatContent: {
    type: String,
    required: true,
  },
});

marked.setOptions({
  highlight: function (code, lang) {
    const language = highlight.getLanguage(lang) ? lang : "plaintext";
    return highlight.highlight(code, { language }).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

const user_avatar =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNjY2NjY2MiPjwvcmVjdD4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyNHB4IiBmaWxsPSIjMzMzMzMzIj5Vc2VyPC90ZXh0PiAgIAo8L3N2Zz4=";
const assistant_avatar = "/assistant.jpg"
var avatar = "";
if (props.role === "user") {
  avatar = user_avatar;
} else {
  avatar = assistant_avatar;
}

const chatContentRandered = DOMPurify.sanitize(marked.parse(props.chatContent));
</script>

<style>
pre {
    margin: 0.5rem 0 0.5rem 0;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    border-radius: 0.375rem;
    background-color: #f8fafc;
}
</style>