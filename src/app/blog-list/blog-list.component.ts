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


  public initialGifLinks: string[] = [
    "https://i.gifer.com/9vil.gif",
    "https://i.gifer.com/H9pn.gif",
    "https://i.pinimg.com/originals/fc/68/f8/fc68f86873c9c661e84ad442cf8fb6cf.gif",
   "https://i.gifer.com/iM5.gif",
    "https://i.gifer.com/ChKB.gif",
    "https://i.gifer.com/AZSC.gif",
    "https://i.gifer.com/J4x.gif"
  ];
  


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
      this.blog.expanded = false;

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
    toggleCard(blog: EBlog) {
      blog.expanded = !blog.expanded;
    }
 

    showForm = false; // Initially, the form is hidden
    formData = { name: '', email: '' }; // Data model for your form fields
  
    toggleForm() {
      this.showForm = !this.showForm; // Toggle the form's visibility
    }
  
    submitForm() {
      // Handle form submission here
      console.log('Form submitted:', this.formData);
      // You can add further logic to send the form data to your backend or perform any other actions.
    }
    

}
