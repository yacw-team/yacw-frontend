<template>
    <div style="display: flex; flex-direction: column; width: 30%  ;">
       
            <el-collapse  accordion>

                <el-collapse-item v-for="(s, index) in all.story" :key="index" :title=s.name  :name=index   >
                    <div>
                       &emsp; {{ s.description }}
                    </div>

                </el-collapse-item>
            </el-collapse>
       
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface story {
    gameId: string,
    name: string,
    description: string,
}
const all = ref({ story: [] as story[] });


onMounted(async () => {
    axios.get('/api/v1/game/story').then(response => {
        all.value = response.data;
    }).catch(() => {
        all.value = {
            story: [{
                gameId: "1",
                name: "故事的名字1",
                description: "乱写的故事描述1,这个有点长",
            }, {
                gameId: "1",
                name: "故事的名字2",
                description: "乱写的故事描述2,这个也不短",
            }
            ]
        }
    })
})

</script>
