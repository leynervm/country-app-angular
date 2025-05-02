import { Component, input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-region-page',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './region-page.component.html'
})
export default class RegionPageComponent {
  regions = input([
    {
      value: 'europe',
      text: 'Europa'
    },
    {
      value: 'america',
      text: 'América'
    },
    {
      value: 'ocean',
      text: 'oceania'
    }
  ])
}
