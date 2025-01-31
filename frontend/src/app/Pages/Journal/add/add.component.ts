import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Journal } from '../model/journal';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { JournalService } from '../services/journal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit, OnDestroy {
  Journal: Journal[] = [];
  content: String = '';
  showNoPreviewEditor: Boolean = false;
  showPreviewEditor: Boolean = true;
  showEnablePreviewBtn: Boolean = false;
  showDisablePreviewBtn: Boolean = true;
  previewContent: String = ''; // To store the content to be displayed in preview
  currentDate: Date = new Date(); // To get and set Today's date
  defaultCategory: String = 'Category';
  constructor(private journalService: JournalService, private router: Router) {}

  // use this editor config when preview is not enabled
  noPreview: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '80vh',
    maxHeight: 'auto',
    width: '80vw',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: false,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: 'Times New Roman',
    defaultFontSize: '4',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    // uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    // uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        // 'insertUnorderedList',
        'insertOrderedList',
        'heading',
        // 'fontName',
      ],
      [
        'fontSize',
        // 'textColor',
        // 'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
  };

  // use this editor config when preview is enabled
  previewEnable: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '80vh',
    maxHeight: 'auto',
    width: '50vw',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: false,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: 'Times New Roman',
    defaultFontSize: '4',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    // customClasses: [
    //   {
    //     name: 'quote',
    //     class: 'quote',
    //   },
    //   {
    //     name: 'redText',
    //     class: 'redText',
    //   },
    //   {
    //     name: 'titleText',
    //     class: 'titleText',
    //     tag: 'h1',
    //   },
    // ],
    // uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    // uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    // toolbarHiddenButtons: [['bold', 'italic']],
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        // 'insertUnorderedList',
        'insertOrderedList',
        'heading',
        // 'fontName',
      ],
      [
        'fontSize',
        // 'textColor',
        // 'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
  };

  // default content for editor
  defaultContent: String = `<P>
  <H1>New Journal</H1><H2>${this.formatDate(this.currentDate)}</H2><H2>${
    this.defaultCategory
  }</H2></P>`;

  journalForm: FormGroup = new FormGroup({
    title: new FormControl(`Title-${this.currentDate}`, Validators.required),
    content: new FormControl(this.defaultContent, Validators.required),
  });

  ngOnInit(): void {
    // assign default content of editor to preview content
    this.previewContent = this.journalForm.get('content')?.value;
    // update preview content according to editor content
    this.journalForm.get('content')?.valueChanges.subscribe((value: string) => {
      this.previewContent = value; // Update the preview content manually
    });
  }

  enablePreview() {
    this.showPreviewEditor = true;
    this.showNoPreviewEditor = false;
    this.showEnablePreviewBtn = false;
    this.showDisablePreviewBtn = true;
  }

  disablePreview() {
    this.showPreviewEditor = false;
    this.showNoPreviewEditor = true;
    this.showEnablePreviewBtn = true;
    this.showDisablePreviewBtn = false;
  }

  // Custom date format function
  formatDate(currentDate: Date) {
    const dateObj = new Date(currentDate);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const suffix = this.getDaySuffix(day); // Get the day suffix like 'st', 'nd', 'rd', 'th'
    return `${day}${suffix} ${month}, ${year}`;
  }

  // Function to determine the day suffix (e.g. 1st, 2nd, 3rd, 4th)
  getDaySuffix(day: number): string {
    const j = day % 10,
      k = day % 100;
    if (j === 1 && k !== 11) {
      return 'st';
    }
    if (j === 2 && k !== 12) {
      return 'nd';
    }
    if (j === 3 && k !== 13) {
      return 'rd';
    }
    return 'th';
  }

  onSubmit() {
    if (this.journalForm.valid) {
      const data = this.journalForm.value;
      this.journalService.addJournal(data).subscribe(
        (res) => {
          console.log('data submitted');
          setTimeout(() => {
            this.navigateToList();
          }, 3000);
        },
        (error) => {
          console.log('error', error);
        }
      );
    } else {
      console.log('invalid');
    }
  }

  navigateToList(): void {
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {}
}
