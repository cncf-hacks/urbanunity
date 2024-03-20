import { TextInput,Label } from 'flowbite-react';
export default function Filter() {
return(
<form class="max-w-lg mx-auto">
    <div class="flex">
        <div class="relative w-full">
        <div className="mb-2 block">
          <Label htmlFor="search" value="Search" />
        </div>   
        <TextInput id="search" type="text" placeholder="Search filter" />
        </div>
    </div>
</form>);
}