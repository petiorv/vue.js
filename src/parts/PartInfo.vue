<template>
    <div>
        <h1>{{ part.title }}</h1>                                                                                                           
        <div>
            {{ part.description }}
        </div>
    </div>
</template>

<script>
import parts from '../data/parts.js'
export default {
    name: 'PartInfo',
    props: {
        partType: { type: String },
        id: {
            type: [String, Number],
            validator: (value) => {
                return Number.isInteger(Number(value));
            }
        }
    },
    computed: {
        part(){
            const { partType, id } = this;
            return parts[partType].find(part => part.id === +id);
        }
    }   
}
</script>
