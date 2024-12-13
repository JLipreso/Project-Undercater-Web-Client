<template>
  <div>
    <h1>Upload Valid ID</h1>
    <p>
      Please upload a front photo of your valid ID<br/>
      make sure text is clear and can be read.
    </p>
    <div class="card border-0">
      <div class="card-body">
        <Cropper class="cropper" 
          :src="photo.coverPicked" 
          :auto-zoom="false" 
          :stencil-props="{ aspectRatio: 10/10, movable: true, resizable: true}" 
          image-restriction="none"
          ref="cropper"
          :canvas="{
            fillColor: 'white'
          }"
        />
        <input class="d-none" type="file" ref="file" @change="loadImage($event)" accept="image/*"/>
        <div class="row mt-4">
          <div class="col-6">
            <button class="btn btn-clear-primary text-primary py-3 w-100 d-flex justify-content-center align-items-center" type="button"  data-dismiss="modal" @click="openPhotoChooser()">
              <i class="bi bi-file-image me-2" style="font-size: 26px;"></i>
              <span>Select Photo</span>
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-primary py-3 w-100 d-flex justify-content-center align-items-center" type="button"  data-dismiss="modal" @click="upload()">
              <i class="bi bi-cloud-upload-fill me-2" style="font-size: 26px;"></i>
              <span>Upload ID</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

  import { defineComponent } from 'vue';
  import { Cropper } from 'vue-advanced-cropper';
  import * as $ from 'jquery';
  import 'vue-advanced-cropper/dist/style.css';
  import { variable } from '@/var';
  import axios from 'axios';
  import { getBookingDataID } from '@/assets/ts/localStorage';
import Swal from 'sweetalert2';

  export default defineComponent({
    name: "SlideContent4",
    components: { Cropper },
    data() {
      return {
        photo: {
          coverPicked: "" as any,
        },
      }
    },
    methods: {
      async openPhotoChooser() {
        (this.$refs['file'] as any).click();
      },
      async loadImage(event: any) {
        var input = event.target;
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.photo.coverPicked = e?.target?.result;
          }
          reader.readAsDataURL(input.files[0]);
        }
      },
      upload() {
        const canvas          = (this.$refs['cropper'] as any).getResult();
        if (canvas) {
          const form = new FormData();
          canvas?.canvas?.toBlob( async (blob: Blob) => {
            await getBookingDataID().then( async (booking_dataid) => {
              form.append("image", blob);
              form.append("booking_dataid", booking_dataid);
              await axios.post( variable()['api_main'] + "photo/upload", form, { headers: {'Content-Type': 'multipart/form-data'}}).then( async (response) => {
                console.log("Upload:", response.data);
                if(response.data?.success) {
                  Swal.fire({
                    title: "Success",
                    text: "Uploaded successfully",
                    icon: "success"
                  }).then( async () => {
                    this.$emit('next', { data: { index: 4 }});
                  });
                }
                else {
                  Swal.fire({
                    title: "Warning",
                    text: "Fail to upload photo, please try again later.",
                    icon: "warning"
                  });
                }
              });
            });
          }, "image/png");
        }
        else {
          Swal.fire({
            title: "Warning",
            text: "Please select valid ID to upload",
            icon: "warning"
          });
        }
      }
    }
  });

</script>
<style scoped>
  .cropper {
    height: 400px;
    background: dimgray;
  }
</style>