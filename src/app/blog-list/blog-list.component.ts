import { Component } from '@angular/core';
import { EBlog } from '../eblog';
import { BlogServiceService } from '../blog-service.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  constructor(private service: BlogServiceService, private fb:FormBuilder){}



  public blogs :Array<EBlog>=[];
  public blog:EBlog={} as EBlog;
  selectedContact: EBlog | undefined;


  blogForm = this.fb.group({
    title:['',Validators.required],
    content:['',Validators.required],
    aname:['',Validators.required],
    aemail:['',Validators.required]
  });
  
    ngOnInit(){
      this.service.GetBlogs().subscribe(data=>this.blogs=data);
      
    }
  
  
    addblog(){
      this.blog.title = this.blogForm.get('title')!.value!;

      this.blog.Content = this.blogForm.get('content')!.value!;

      this.blog.authorName = this.blogForm.get('aname')!.value!;
      this.blog.authorEmail = this.blogForm.get('aemail')!.value!;

      this.service.AddBlog(this.blog).subscribe((data:any)=>
      this.blogs.push(data));
    }
  
    deleteContact(id: string) {
      this.service.DeletEBlog(id).subscribe(() => {
        // Contact deleted successfully, update the list
        this.blogs = this.blogs.filter(blog => blog.id !== id);
      });
    }

    get Title(){
      return this.blogForm.get('title');

    }

    get Content(){
      return this.blogForm.get('content');

    }
    get Aname(){
      return this.blogForm.get('aname');

    }
    get Aemail(){
      return this.blogForm.get('aemail');

    }
  
    // updatetodbContact() {
    //   this.service.UpdateContact(this.contact.id, this.contact).subscribe(updatedContact => {
    //     // Update the contact in the contacts array with the updated data
    //     const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    //     if (index !== -1) {
    //       this.contacts[index] = updatedContact;
    //     }
    //   });
    // }
  
    // updateContact(contact: EBlog) {
    //   // Populate the input fields with the selected contact's values
    //   this.contact = { ...contact };
    // }
  
    clear(){
      // this.contact = { id: '',
      // firstname: '',
      // lastname: '',
      // email: '',
      // city: '',
      // phone: ''};
    }
    

}
