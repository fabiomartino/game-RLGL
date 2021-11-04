import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Material
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

const materialModules = [
  // Material
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatCommonModule,
  MatRippleModule,
  MatToolbarModule,
  MatFormFieldModule,
  // FlexLayout
  FlexLayoutModule,
];

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules]
})
export class MaterialModule {}
