import { JournalArticle, EditorialMember, IssueMetadata } from '../types';

export const JOURNAL_INFO = {
  name: "Shivraj 350: International Peer Reviewed Multidisciplinary Journal",
  shortName: "Shivraj 350",
  publisher: "Shivaji College, University of Delhi",
  address: "Ring Road, Raja Garden, New Delhi - 110027, India",
  email: "journal@shivaji.du.ac.in",
  website: "www.shivajicollege.ac.in",
  issn: "XXXX-XXXX",
  currentIssueString: "Inaugural Issue, Volume 1, Issue 1, Jan-June 2026",
  frequency: "Biannual (January - June & July - December)",
  peerReviewType: "Double-Blind Peer Review",
  accessType: "Open Access (CC-BY-NC 4.0)",
  verbatimScope: "Shivraj 350: Multidisciplinary Journal is a peer-reviewed, academic platform dedicated to fostering interdisciplinary research and dialogue across the sciences, social sciences, humanities, and professional studies. The journal aims to promote original thinking, critical inquiry and innovative solutions to contemporary challenges with global relevance and local impact."
};

export const CURRENT_ISSUE: IssueMetadata = {
  title: "Inaugural Issue",
  volume: "Volume 1",
  issue: "Issue 1",
  period: "Jan - June 2026",
  year: 2026,
  issn: "XXXX-XXXX",
  totalArticles: 8,
  editorNote: "With profound honor and academic stewardship, Shivaji College, University of Delhi presents the Inaugural Issue of 'Shivraj 350: International Peer Reviewed Multidisciplinary Journal'. This issue brings together eight pioneering peer-reviewed investigations spanning natural sciences, computational modeling, economic policy, archival history, and ethical corporate governance."
};

export const INAUGURAL_ARTICLES: JournalArticle[] = [
  {
    id: "art-01",
    slug: "quantum-materials-sustainable-energy",
    articleNumber: "ARTICLE 01",
    discipline: "Sciences",
    title: "Quantum Materials and Sustainable Energy: Computational Analysis of 2D Heterostructures for Next-Generation Photovoltaics",
    authors: ["Dr. Rajesh K. Sharma", "Ananya Deshmukh", "Prof. Vikram Sen"],
    affiliation: "Department of Physics & Chemistry, Shivaji College, University of Delhi",
    category: "Sciences",
    abstract: "This study presents first-principles density functional theory (DFT) computations evaluating the electronic band structure, charge separation dynamics, and optical absorption coefficients of transition metal dichalcogenide heterobilayers. Our findings indicate a 24.3% enhancement in theoretical power conversion efficiency, highlighting their transformative promise for scalable clean energy infrastructures.",
    keywords: ["Density Functional Theory", "2D Heterostructures", "Photovoltaics", "Renewable Energy", "Quantum Materials"],
    doi: "10.5281/shivraj350.2026.0101",
    pages: "1–14",
    pageRange: "1–14",
    publishedDate: "January 15, 2026",
    sections: [
      {
        heading: "1. Introduction & Theoretical Motivation",
        content: "The urgent global imperative for decarbonization has intensified the search for clean energy conversion platforms capable of exceeding the thermodynamic Shockley-Queisser threshold of single-junction silicon devices. Over the past decade, atomically thin two-dimensional (2D) crystals—encompassing transition metal dichalcogenides (TMDs) such as MoS₂, WS₂, and WSe₂—have captured extraordinary academic and industrial attention. Their quantum confinement effects, layer-dependent electronic bandgap tunability, and strong light-matter interactions render them exceptional candidates for next-generation optoelectronic and photovoltaic assemblies."
      },
      {
        heading: "2. Computational Methodology & Ab Initio Modeling",
        content: "In this investigation, first-principles Density Functional Theory (DFT) computations were carried out utilizing the projector augmented wave (PAW) method implemented within the Vienna Ab-initio Simulation Package (VASP). Generalized gradient approximations (GGA) parameterized by Perdew, Burke, and Ernzerhof (PBE) were systematically employed to handle exchange-correlation potentials. To accurately capture dispersion forces between van der Waals heterobilayers, Grimme's DFT-D3 empirical correction scheme was integrated. Relativistic spin-orbit coupling (SOC) was accounted for in all band-structure evaluations, and a plane-wave kinetic energy cutoff of 520 eV was strictly maintained across a dense Monkhorst-Pack k-point grid."
      },
      {
        heading: "3. Results: Band Alignment, Carrier Mobility & Optical Absorption",
        content: "Relaxed structural calculations demonstrate that the MoS₂/WSe₂ heterobilayer preserves a robust mechanical stability with an equilibrium interlayer spacing of 3.12 Å. Crucially, the system forms an authentic staggered Type-II band alignment, in which the valence band maximum resides predominantly within the WSe₂ monolayer while the conduction band minimum is localized across the MoS₂ layer. Time-dependent non-adiabatic molecular dynamics simulations indicate that photo-generated electron-hole separation occurs within approximately 42 femtoseconds, substantially outpacing competing radiative recombination pathways. The computed optical absorption coefficient exceeds 10⁵ cm⁻¹ across the visible to near-infrared spectrum, translating into a simulated theoretical power conversion efficiency (PCE) of 24.3%."
      },
      {
        heading: "4. Discussion & Scalability Considerations",
        content: "While theoretical modeling demonstrates uncompromised optoelectronic superiority, translating these computational benchmarks into macroscopic solar cells requires overcoming significant synthetic hurdles. Primary among these are large-area chemical vapor deposition (CVD) synthesis of wafer-scale heterostructures without domain boundaries or sulfur vacancies. Furthermore, interface passivation and transparent top electrodes must be engineered to prevent localized trap states. Encouragingly, recent advances in scalable roll-to-roll mechanical transfer suggest that prototype tandem cells may achieve industrial viability within the current decade."
      },
      {
        heading: "5. Conclusion & Forward Outlook",
        content: "This study provides a rigorous, parameter-free quantum mechanical foundation substantiating 2D van der Waals heterostructures as transformative building blocks for sustainable photovoltaic technologies. By pairing computational condensed-matter physics with nanoscale material engineering, future research can directly target optimized layer stacking and novel multi-junction architectures to expedite the global transition to clean energy."
      }
    ],
    references: [
      "Sharma, R. K., & Deshmukh, A. (2025). First-principles electronic structure of transition metal dichalcogenide superlattices. Physical Review B, 111(8), 085412.",
      "Novoselov, K. S., Mishchenko, A., Carvalho, A., & Castro Neto, A. H. (2016). 2D materials and van der Waals heterostructures. Science, 353(6298), aac9439.",
      "Perdew, J. P., Burke, K., & Ernzerhof, M. (1996). Generalized gradient approximation made simple. Physical Review Letters, 77(18), 3865–3868.",
      "Grimme, S., Antony, J., Ehrlich, S., & Krieg, H. (2010). A consistent and accurate ab initio parametrization of density functional dispersion correction. The Journal of Chemical Physics, 132(15), 154104.",
      "Sen, V., & Sharma, R. K. (2024). Interfacial charge transfer dynamics in stacked optoelectronic materials. Applied Physics Letters, 124(12), 121101."
    ],
    fullText: `1. Introduction & Theoretical Motivation
The urgent global imperative for decarbonization has intensified the search for clean energy conversion platforms capable of exceeding the thermodynamic Shockley-Queisser threshold of single-junction silicon devices. Over the past decade, atomically thin two-dimensional (2D) crystals have captured extraordinary academic attention.

2. Computational Methodology
First-principles computations were conducted within the framework of Density Functional Theory (DFT) using generalized gradient approximations (GGA) parameterized by Perdew, Burke, and Ernzerhof (PBE). Relativistic spin-orbit coupling (SOC) was accounted for in all band-structure evaluations.

3. Results: Band Alignment & Carrier Mobility
Structural calculations demonstrate that the heterobilayer forms an authentic staggered Type-II band alignment. Photo-generated electron-hole separation occurs within approximately 42 femtoseconds, yielding a theoretical power conversion efficiency of 24.3%.

4. Conclusion & Interdisciplinary Outlook
These findings provide a rigorous quantum mechanical foundation substantiating 2D van der Waals heterostructures as transformative building blocks for sustainable photovoltaic technologies.`
  },
  {
    id: "art-02",
    slug: "agrarian-micro-credit-architectures",
    articleNumber: "ARTICLE 02",
    discipline: "Social Sciences",
    title: "Revisiting Agrarian Micro-Credit Architectures in Semi-Arid India: Empirical Assessment of Women-Led Self-Help Groups",
    authors: ["Dr. Meenakshi Sundaram", "Pooja Verma"],
    affiliation: "Department of Economics & Public Policy, Shivaji College, University of Delhi",
    category: "Social Sciences",
    abstract: "Drawing on extensive field datasets from 450 rural households across semi-arid farming belts, this paper examines how collective savings mechanisms and credit cooperatives mitigate monsoon-induced income volatility. Empirical econometric modeling illustrates a statistically significant 18.6% rise in household nutritional diversity and educational persistence among participating families.",
    keywords: ["Microfinance", "Agrarian Economy", "Self-Help Groups", "Gender Empowerment", "Econometrics", "Rural Development"],
    doi: "10.5281/shivraj350.2026.0102",
    pages: "15–31",
    pageRange: "15–31",
    publishedDate: "February 04, 2026",
    sections: [
      {
        heading: "1. Introduction & Rural Context",
        content: "In semi-arid agro-ecological belts across peninsular and central India, smallholder farmers face severe income precarity driven by delayed monsoons, groundwater depletion, and erratic market procurement rates. While institutional rural banking has expanded, formal collateral requirements traditionally exclude marginalized tenant farmers and landless agricultural laborers. Over the last two decades, women-led Self-Help Groups (SHGs) under the National Rural Livelihoods Mission (NRLM) have emerged as pivotal socio-financial safety nets."
      },
      {
        heading: "2. Empirical Survey Design & Econometric Framework",
        content: "This study constructs a panel dataset tracking 450 agrarian households across 18 village clusters in Maharashtra and Karnataka over a 36-month period (2022–2025). A quasi-experimental Difference-in-Differences (DiD) regression combined with Propensity Score Matching (PSM) was deployed to isolate the impact of SHG micro-credit access from confounding variables such as baseline land ownership, irrigation access, and state welfare transfers."
      },
      {
        heading: "3. Econometric Findings & Nutritional Diversity",
        content: "Regression models reveal that active membership in credit cooperatives decreased the likelihood of distress cattle sales and predatory informal moneylender borrowing by 34.2% during drought quarters. Moreover, households with continuous SHG engagement registered a statistically significant 18.6% increase in dietary diversity (measured via the FAO Household Dietary Diversity Score) and an 11.4% improvement in secondary school retention for female adolescents."
      },
      {
        heading: "4. Policy Implications & Credit Restructuring",
        content: "Despite these positive welfare gains, systemic bottlenecks persist in loan repayment structures. The prevailing rigid monthly amortization models conflict sharply with agrarian cash-flow seasonality, where liquidity is concentrated around bi-annual harvest windows. We recommend introducing dynamic repayment moratoriums tied to localized satellite precipitation indexes."
      },
      {
        heading: "5. Concluding Remarks",
        content: "Women-led Self-Help Groups represent far more than grassroots financial intermediaries; they function as powerful catalysts for social solidarity, localized dispute resolution, and gender-inclusive rural resilience. Strengthening their linkages with regional public banks is paramount for equitable agricultural development."
      }
    ],
    references: [
      "Sundaram, M., & Verma, P. (2024). Micro-credit dynamics in rainfed agriculture. Indian Economic Review, 59(2), 189–214.",
      "Banerjee, A., Duflo, E., Glennerster, R., & Kinnan, C. (2015). The miracle of microfinance? Evidence from a randomized evaluation. American Economic Journal: Applied Economics, 7(1), 22–53.",
      "Kabeer, N. (2001). Conflicts over credit: Re-evaluating the empowerment potential of loans to women in rural Bangladesh. World Development, 29(1), 63–84.",
      "NABARD. (2023). Status of Microfinance in India: Annual Report 2022-23. National Bank for Agriculture and Rural Development, Mumbai."
    ],
    fullText: `1. Introduction
Financial inclusion in agrarian contexts serves as a vital shock-absorber against climatic vulnerabilities. Self-Help Groups (SHGs) under national livelihoods missions have evolved from informal lending circles to formal banking intermediaries.

2. Empirical Framework
A quasi-experimental difference-in-differences (DiD) approach was implemented across treatment and control clusters over a 36-month observational window, controlling for landholding size and baseline asset ownership.

3. Key Findings
Access to structured micro-credit diminished distress sale of cattle by 34% during severe dry spells. Moreover, intra-household bargaining power shifted measurably toward female decision-makers.

4. Policy Implications
Financial policymakers must prioritize flexible loan restructuring calendars aligned with crop sowing and harvesting cycles rather than rigid monthly amortization schedules.`
  },
  {
    id: "art-03",
    slug: "sovereign-resistance-shivaji-maritime",
    articleNumber: "ARTICLE 03",
    discipline: "Humanities",
    title: "Echoes of Sovereign Resistance: Archival Re-examination of Chhatrapati Shivaji's Administrative and Maritime Philosophy",
    authors: ["Prof. Devendra N. Joshi", "Dr. Shalini Kulkarni"],
    affiliation: "Department of History & Cultural Heritage, University of Delhi",
    category: "Humanities",
    abstract: "Commemorating 350 years of the coronation of Chhatrapati Shivaji Maharaj, this critical archival study revisits primary Modi script records, Portuguese naval treaties, and regional revenue charters. We demonstrate how the Maratha administrative framework pioneered progressive ryotwari agrarian revenue, ecological fort engineering, and indigenous naval sovereignty.",
    keywords: ["Shivaji 350", "Maratha Administration", "Maritime History", "Modi Script", "Fort Architecture", "Statecraft"],
    doi: "10.5281/shivraj350.2026.0103",
    pages: "32–48",
    pageRange: "32–48",
    publishedDate: "March 10, 2026",
    sections: [
      {
        heading: "1. Historical Context: The Coronation of 1674",
        content: "The 350th commemoration of the coronation of Chhatrapati Shivaji Maharaj at Raigad in 1674 provides an imperative occasion to transcend hagiographic legend and engage with the empirical administrative foundations of 'Hindavi Swarajya'. Emerging in a seventeenth-century subcontinent dominated by centralized Mughal suzerainty and encroaching European naval commercial monopolies, Shivaji established a sovereign polity that fundamentally redefined regional statecraft."
      },
      {
        heading: "2. Archival Methodology & Primary Source Collation",
        content: "This research examines 142 primary documents, encompassing unpublished Modi-script 'Adnyapatra' state letters from the Pune State Archives, consular correspondence preserved in the Goa Historical Archives, and contemporary Dutch East India Company (VOC) commercial factory logbooks. Cross-referencing these multilingual archives enables a granular reconstruction of fiscal administration, forestry codes, and naval doctrine."
      },
      {
        heading: "3. Agrarian Reform: The Precursor to Ryotwari Systems",
        content: "Crucial archival evidence highlights the abolition of oppressive intermediary feudal tax-farmers ('Deshmukhs' and 'Kulkarnis') in favor of direct state measurement of cultivated land. By deploying standard measuring poles ('Shivshahi Kathi') and categorizing land into irrigated, rainfed, and fallow tracts, the administration collected fixed percentages in grain or cash, explicitly forbidding arbitrary exactions during drought seasons."
      },
      {
        heading: "4. Indigenous Maritime Architecture & Naval Forts",
        content: "Recognizing that sovereign defense in the Deccan was inextricably bound to the Arabian Sea, Shivaji commissioned the pioneering Maratha navy under commanders like Maynak Bhandari and Daryasarang. The construction of island fortresses—most notably Sindhudurg and Vijaydurg—utilized lead-cast underwater foundations and aerodynamic bastion layouts designed to withstand both turbulent monsoonal tides and European naval cannonades."
      },
      {
        heading: "5. Conclusion & Contemporary Historiographical Significance",
        content: "The administrative philosophy of Chhatrapati Shivaji demonstrates that indigenous governance was characterized by ecological prudence, decentralized accountability, and religious tolerance. Far from being merely a military tactician, Shivaji was an institutional architect whose governance principles retain profound relevance for modern democratic institutions."
      }
    ],
    references: [
      "Joshi, D. N., & Kulkarni, S. (2025). Sovereignty and maritime defense in 17th-century Western India. Indian Historical Review, 52(1), 45–72.",
      "Sarkar, J. (1920). Shivaji and His Times. M. C. Sarkar & Sons, Calcutta.",
      "Kulkarni, A. R. (1996). Maharashtra in the Age of Shivaji. Deshmukh & Co., Pune.",
      "Balkrishna. (1932). Shivaji the Great: Vol. I & II. D. B. Taraporevala Sons & Co., Bombay."
    ],
    fullText: `1. Historical Context
The year 1674 marked not merely a regional coronation but the institutionalization of 'Hindavi Swarajya' grounded in equitable tax levies, environmental conservation of forest reserves, and the creation of an indigenous maritime fleet along the Konkan coast.

2. Archival Methodology
Primary correspondence from the Pune and Goa State Archives was critically collated against contemporary European commercial logbooks.

3. Synthesis
The administration codified strict injunctions against arbitrary confiscation of peasant yields, establishing fixed cash-crop tariffs and recognizing merchant guilds regardless of creed.

4. Conclusion
Shivaji's governance model presents enduring principles of decentralized accountability, strategic defense autonomy, and indigenous institutional resilience.`
  },
  {
    id: "art-04",
    slug: "esg-disclosure-integrity-cost-capital",
    articleNumber: "ARTICLE 04",
    discipline: "Professional Studies",
    title: "ESG Disclosure Integrity and Cost of Capital: Evidence from Emerging Market Blue-Chip Corporations",
    authors: ["Dr. Arvind T. Nair", "Kavita Singhal"],
    affiliation: "Department of Commerce, Shivaji College, University of Delhi",
    category: "Professional Studies",
    abstract: "Utilizing panel regression across 120 listed enterprises between 2018 and 2024, this paper investigates the causal impact of BRSR (Business Responsibility and Sustainability Reporting) metrics on weighted average cost of capital (WACC). Results confirm that rigorous governance and emissions verification compress equity risk premiums by 62 basis points.",
    keywords: ["ESG Reporting", "Cost of Capital", "Corporate Governance", "BRSR Framework", "Sustainable Finance"],
    doi: "10.5281/shivraj350.2026.0104",
    pages: "49–65",
    pageRange: "49–65",
    publishedDate: "April 02, 2026",
    sections: [
      {
        heading: "1. Introduction & Regulatory Background",
        content: "Over the past decade, non-financial corporate disclosures have undergone a monumental shift from voluntary public relations brochures to mandatory regulatory standards. In emerging markets such as India, the Securities and Exchange Board of India (SEBI) introduced the Business Responsibility and Sustainability Reporting (BRSR) framework, requiring top 1,000 listed entities to disclose quantifiable environmental, social, and governance indicators."
      },
      {
        heading: "2. Sample Data & Econometric Specification",
        content: "We construct a balanced panel comprising 120 blue-chip non-financial corporations listed on the National Stock Exchange (Nifty 50 and Nifty Next 50) covering the financial years 2018–2024. Using a two-stage least squares (2SLS) instrumental variable model to mitigate endogeneity, we benchmark Bloomberg and CRISIL ESG disclosure scores against weighted average cost of capital (WACC) and credit default spreads."
      },
      {
        heading: "3. Empirical Results & Sensitivity Analysis",
        content: "Empirical results indicate that a 10% increase in ESG disclosure comprehensiveness corresponds to a statistically significant 62 basis-point reduction in equity risk premiums (p < 0.01). Furthermore, third-party audited Scope 1 and Scope 2 greenhouse gas disclosures correlate with narrower bond issuance spreads, predominantly driven by European and North American institutional ESG mandate allocations."
      },
      {
        heading: "4. Discussion on Greenwashing & Verification",
        content: "Interestingly, when ESG disclosures rely purely on qualitative commitments without standardized carbon accounting or independent assurance, the capital cost benefits diminish to statistical insignificance. This highlights capital markets' growing sophistication in discounting superficial sustainability rhetoric."
      },
      {
        heading: "5. Strategic Recommendations & Conclusion",
        content: "Chief Financial Officers and corporate boards must align ESG compliance with core capital allocation strategies rather than segregating sustainability within peripheral marketing teams. Transparent disclosures yield demonstrable economic dividends in contemporary capital markets."
      }
    ],
    references: [
      "Nair, A. T., & Singhal, K. (2025). Sustainability disclosures and equity premiums in South Asian equities. Journal of Sustainable Finance & Investment, 15(3), 312–338.",
      "Dhaliwal, D. S., Li, O. Z., Tsang, A., & Yang, Y. G. (2011). Voluntary nonfinancial disclosure and the cost of equity capital. The Accounting Review, 86(1), 59–100.",
      "SEBI. (2021). Circular on Business Responsibility and Sustainability Reporting (BRSR). Securities and Exchange Board of India, Mumbai."
    ],
    fullText: `1. Introduction
As global institutional capital pivots toward sustainable assets, corporate non-financial disclosures have shifted from voluntary PR exercises to mandatory compliance imperatives.

2. Dataset & Econometric Model
The study employs fixed-effects panel estimation on top market-capitalized firms in India, benchmarking ESG scores against verified carbon footprint audits.

3. Empirical Insights
Firms exhibiting transparent Scope 1 and Scope 2 disclosures consistently achieved lower debt issuance costs and enhanced institutional foreign portfolio allocations.

4. Strategic Takeaways
Corporate boards must integrate sustainability metrics directly into executive incentive structures to realize tangible capital market dividends.`
  },
  {
    id: "art-05",
    slug: "crispr-cas9-stress-tolerance-cereals",
    articleNumber: "ARTICLE 05",
    discipline: "Sciences",
    title: "CRISPR-Cas9 Mediated Abiotic Stress Tolerance in Cereal Cultivars: A Systematic Biochemical Review",
    authors: ["Dr. Sunita Rao", "Dr. Harpreet Singh"],
    affiliation: "Department of Botany & Biochemistry, Shivaji College, University of Delhi",
    category: "Sciences",
    abstract: "Climate-induced salinity and drought stress constitute existential challenges to subtropical cereal yields. This review synthesizes targeted genome editing protocols targeting transcription factor families (DREB, WRKY, and NAC). We outline ethical regulatory landscapes and field-trial biosafety assessments.",
    keywords: ["CRISPR-Cas9", "Abiotic Stress", "Crop Genetics", "Food Security", "Functional Genomics"],
    doi: "10.5281/shivraj350.2026.0105",
    pages: "66–82",
    pageRange: "66–82",
    publishedDate: "April 28, 2026",
    sections: [
      {
        heading: "1. Introduction & Agricultural Urgency",
        content: "Subtropical cereal agriculture faces unprecedented threats from rising ambient temperatures, expanding soil salinization, and unpredictable drought intervals. Traditional cross-breeding approaches are constrained by long generation cycles and linkage drag, creating an urgent scientific need for precision functional genomics to secure global food security."
      },
      {
        heading: "2. Molecular Mechanisms of CRISPR-Cas9 in Cereals",
        content: "Clustered Regularly Interspaced Short Palindromic Repeats (CRISPR)-associated protein 9 (Cas9) has revolutionized functional plant biology. By designing single-guide RNAs (sgRNAs) targeting conserved promoter motifs, researchers can induce targeted double-strand breaks (DSBs) repaired via non-homologous end joining (NHEJ) or homology-directed repair (HDR)."
      },
      {
        heading: "3. Transcription Factor Modulation: DREB, WRKY & NAC",
        content: "This paper reviews targeted mutations across rice (Oryza sativa) and wheat (Triticum aestivum). Knockout of negative regulatory kinase genes alongside targeted promoter enhancements of Dehydration-Responsive Element-Binding (DREB) and NAC stress-responsive factors yielded up to 28% improvements in drought survival rates under laboratory simulation."
      },
      {
        heading: "4. Regulatory Biosafety & Regulatory Paradigms",
        content: "We critically analyze global biosafety distinctions between SDN-1 (transgene-free site-directed nucleases) and transgenic GMO classifications. India's progressive guidelines exempting SDN-1 and SDN-2 categories offer a viable regulatory pathway for rapid agronomic adoption."
      },
      {
        heading: "5. Conclusion",
        content: "CRISPR-Cas9 mediated genome editing represents a crucial scientific pillar in the climate adaptation toolkit. Responsible field trials and farmer-centric dissemination are essential to translate laboratory breakthroughs into harvested grain."
      }
    ],
    references: [
      "Rao, S., & Singh, H. (2025). Targeted genome editing in cereal crop improvement. Trends in Plant Science, 30(4), 412–429.",
      "Doudna, J. A., & Charpentier, E. (2014). The new frontier of genome engineering with CRISPR-Cas9. Science, 346(6213), 1258096.",
      "Gao, C. (2021). Genome engineering for crop improvement and future agriculture. Cell, 184(6), 1621–1635."
    ],
    fullText: `1. Introduction
Climate-induced salinity and drought stress constitute existential challenges to subtropical cereal yields. This review synthesizes targeted genome editing protocols targeting transcription factor families.

2. Molecular Framework
CRISPR-Cas9 facilitates precise genetic modifications without foreign transgene retention, enabling accelerated breeding cycles for climate-resilient crop cultivars.

3. Key Insights
Field evaluations confirm that targeted disruption of negative regulators enhances root architecture, osmotic adjustment, and membrane integrity during prolonged moisture deficits.`
  },
  {
    id: "art-06",
    slug: "digital-panopticon-algorithmic-public-spheres",
    articleNumber: "ARTICLE 06",
    discipline: "Social Sciences",
    title: "Digital Panopticon or Civic Agora? Algorithmic Public Spheres and Youth Political Engagement in South Asia",
    authors: ["Dr. Alok Mukherjee", "Tanvi Bhatia"],
    affiliation: "Department of Political Science & Media Studies, University of Delhi",
    category: "Social Sciences",
    abstract: "Examining over 1.2 million anonymized social media engagements alongside 32 qualitative focus groups, this paper uncovers how algorithmic curation structures deliberative democracy among university demographics. We argue that despite algorithmic echo-chambers, youth movements leverage subversive digital counter-publics to advocate for climate action and educational equity.",
    keywords: ["Digital Democracy", "Algorithmic Governance", "Youth Politics", "Public Sphere", "Social Media"],
    doi: "10.5281/shivraj350.2026.0106",
    pages: "83–99",
    pageRange: "83–99",
    publishedDate: "May 12, 2026",
    sections: [
      {
        heading: "1. Introduction: The Reconfigured Public Sphere",
        content: "Habermas's classical formulation of the bourgeois public sphere assumed accessible physical and print arenas for rational-critical debate. In 21st-century South Asia, political discourse is increasingly mediated by proprietary algorithmic feeds that optimize for sensationalism, engagement metrics, and behavioral advertising."
      },
      {
        heading: "2. Mixed-Methods Empirical Methodology",
        content: "Our study integrates computational natural language processing (NLP) on 1.2 million political social media interactions with 32 in-depth qualitative focus group sessions conducted across university campuses in Delhi, Mumbai, and Kolkata over 18 months."
      },
      {
        heading: "3. Polarization, Surveillance & Subversive Counter-Publics",
        content: "While algorithmic recommendation pipelines routinely amplify partisan affective polarization, youth activists actively develop counter-tactics: utilizing ephemeral messaging platforms, algorithmic obfuscation ('algospeak'), and decentralized meme culture to build solidarity across regional cleavages."
      },
      {
        heading: "4. Policy Implications for Democratic Governance",
        content: "Democratic resilience requires robust algorithmic transparency laws, digital media literacy curricula in higher education, and decentralized public-service digital platforms insulated from corporate monetization imperatives."
      },
      {
        heading: "5. Conclusion",
        content: "The contemporary digital arena is neither exclusively an authoritarian panopticon nor an idealized civic agora; it remains a deeply contested ideological terrain where democratic agency continuously negotiates algorithmic constraints."
      }
    ],
    references: [
      "Mukherjee, A., & Bhatia, T. (2025). Algorithmic deliberation and youth citizenship. Media, Culture & Society, 47(2), 245–268.",
      "Habermas, J. (1989). The Structural Transformation of the Public Sphere. MIT Press.",
      "Zuboff, S. (2019). The Age of Surveillance Capitalism. PublicAffairs, New York."
    ],
    fullText: `1. Introduction
In 21st-century South Asia, political discourse is increasingly mediated by proprietary algorithmic feeds that optimize for engagement metrics and behavioral tracking.

2. Empirical Findings
Our mixed-method analysis reveals that university youth actively mobilize decentralized digital counter-publics, sidestepping partisan echo chambers to champion environmental and education reforms.`
  },
  {
    id: "art-07",
    slug: "postcolonial-ecocriticism-indian-fiction",
    articleNumber: "ARTICLE 07",
    discipline: "Humanities",
    title: "Postcolonial Ecocriticism in Contemporary Indian English Fiction: Narratives of Water, Dispossession, and Hope",
    authors: ["Dr. Renu Vashishta"],
    affiliation: "Department of English, Shivaji College, University of Delhi",
    category: "Humanities",
    abstract: "Through close textual readings of contemporary Indian ecological novels, this treatise maps how literary imagination articulates riverine degradation, indigenous displaced communities, and the commodification of groundwater aquifers. The narrative architecture serves not merely as aesthetic lamentation but as an urgent philosophical summons for environmental stewardship.",
    keywords: ["Ecocriticism", "Postcolonial Literature", "Riverine Ecology", "Environmental Justice", "Indian Fiction"],
    doi: "10.5281/shivraj350.2026.0107",
    pages: "100–114",
    pageRange: "100–114",
    publishedDate: "May 25, 2026",
    sections: [
      {
        heading: "1. Introduction: Postcolonial Environmentalism",
        content: "Western ecocriticism has historically privileged pristine wilderness preservation, often overlooking the socio-ecological realities of the Global South where nature and human survival are intimately intertwined. Postcolonial ecocriticism bridges this divide by examining how colonial resource extraction and modern developmentalism displace vulnerable riverine and forest-dwelling communities."
      },
      {
        heading: "2. Literary Corpora & Textual Analysis",
        content: "This paper engages in close critical readings of contemporary Indian English novels, including Amitav Ghosh's *The Hungry Tide* and *The Great Derangement*, Arundhati Roy's *The God of Small Things*, and recent speculative climate fiction. The analysis explores how riverine ecologies—from the Sundarbans mangrove deltas to dammed Himalayan rivers—operate as active protagonists."
      },
      {
        heading: "3. The Politics of Hydrological Dispossession",
        content: "Water commodification and megaproject damming emerge as central motifs of structural violence. The selected narratives highlight how indigenous ecological epistemologies ('Jal, Jungle, Jameen') resist technocratic developmental narratives, articulating alternative models of cohabitation."
      },
      {
        heading: "4. Conclusion & Pedagogical Value",
        content: "Contemporary Indian literature provides an indispensable imaginative archive for environmental ethics. Integrating ecocritical literary studies into collegiate curricula cultivates empathetic, ecologically conscious citizenship capable of envisioning sustainable futures."
      }
    ],
    references: [
      "Vashishta, R. (2025). Riverine narratives and environmental justice in Indian literature. Journal of Postcolonial Writing, 61(1), 89–104.",
      "Ghosh, A. (2016). The Great Derangement: Climate Change and the Unthinkable. University of Chicago Press.",
      "Nixon, R. (2011). Slow Violence and the Environmentalism of the Poor. Harvard University Press."
    ],
    fullText: `1. Introduction
Through close textual readings of contemporary Indian ecological novels, this treatise maps how literary imagination articulates riverine degradation and the commodification of groundwater aquifers.

2. Critical Synthesis
The narrative architecture of contemporary ecological fiction serves not merely as aesthetic lamentation but as an urgent philosophical summons for environmental stewardship and justice.`
  },
  {
    id: "art-08",
    slug: "machine-learning-high-frequency-trading",
    articleNumber: "ARTICLE 08",
    discipline: "Professional Studies",
    title: "Machine Learning Implementations in Algorithmic High-Frequency Trading: Risk Controls and Market Volatility",
    authors: ["Prof. Mohit Chawla", "Siddharth Goel"],
    affiliation: "Department of Computer Science & Commerce, University of Delhi",
    category: "Professional Studies",
    abstract: "This paper evaluates reinforcement learning algorithms deployed in high-frequency order book execution. Using millisecond-level tick data from national equities exchanges, we test stress-resilience under black-swan volatility spikes and propose adaptive circuit-breaker latency controls to prevent cascaded flash crashes.",
    keywords: ["Reinforcement Learning", "Algorithmic Trading", "Market Microstructure", "Financial Risk", "High-Frequency Data"],
    doi: "10.5281/shivraj350.2026.0108",
    pages: "115–132",
    pageRange: "115–132",
    publishedDate: "June 08, 2026",
    sections: [
      {
        heading: "1. Introduction & Modern Market Microstructure",
        content: "Financial equity markets have evolved into hyper-automated, nanosecond-latency computational ecosystems. Algorithmic High-Frequency Trading (HFT) accounts for more than 55% of continuous order volume on major international exchanges. While automated liquidity provision tightens bid-ask spreads, it introduces unprecedented systemic risks of algorithmic contagion and flash crashes."
      },
      {
        heading: "2. Machine Learning & Deep Q-Learning Architecture",
        content: "We implement a Deep Q-Network (DQN) reinforcement learning agent engineered to optimize limit order placement and inventory management across limit order books (LOB). The model is trained on 14 billion nanosecond-stamped order message records from national exchanges."
      },
      {
        heading: "3. Empirical Stress-Testing & Contagion Dynamics",
        content: "Under simulated black-swan liquidity shock scenarios, unconstrained RL agents demonstrated aggressive capital preservation routines that rapidly withdrew limit orders simultaneously, exacerbating market illiquidity by 310% within 800 milliseconds."
      },
      {
        heading: "4. Proposed Adaptive Risk Protocols",
        content: "We design an adaptive volatility-sensitive latency penalty mechanism that dampens predatory quoting during extreme order imbalance phases. Backtesting reveals this safeguard mitigates flash-crash contagion without degrading baseline price discovery."
      },
      {
        heading: "5. Regulatory & Academic Conclusion",
        content: "Regulators must develop AI-assisted supervisory tools capable of real-time multi-agent game-theoretic analysis. Safe financial innovation requires combining machine learning advances with robust systemic circuit-breakers."
      }
    ],
    references: [
      "Chawla, M., & Goel, S. (2025). Reinforcement learning and market microstructure stability. Journal of Financial Econometrics, 23(1), 112–141.",
      "O'Hara, M. (2015). High frequency market microstructure. Journal of Financial Economics, 116(2), 257–270.",
      "Cartea, Á., Jaimungal, S., & Penalva, J. (2015). Algorithmic and High-Frequency Trading. Cambridge University Press."
    ],
    fullText: `1. Introduction
This paper evaluates reinforcement learning algorithms deployed in high-frequency order book execution using millisecond-level tick data from national equities exchanges.

2. Empirical Risk Controls
We test stress-resilience under volatility spikes and propose adaptive circuit-breaker latency controls to prevent cascaded flash crashes while preserving liquidity.`
  }
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return INAUGURAL_ARTICLES.find(a => a.slug === slug || a.id === slug);
}

export function getArticleById(id: string): JournalArticle | undefined {
  return INAUGURAL_ARTICLES.find(a => a.id === id);
}

export const EDITORIAL_BOARD: EditorialMember[] = [
  {
    name: "Prof. (Dr.) Virender Bhardwaj",
    role: "Patron & Principal",
    department: "Institutional Leadership",
    institution: "Shivaji College, University of Delhi",
  },
  {
    name: "Prof. S. K. Awasthi",
    role: "Editor-in-Chief",
    department: "Multidisciplinary Research Cell",
    institution: "Shivaji College, University of Delhi",
  },
  {
    name: "Dr. Ruchira Dhingra",
    role: "Associate Editor (Sciences)",
    department: "Department of Chemistry",
    institution: "Shivaji College, University of Delhi",
  },
  {
    name: "Dr. Preeti Sharma",
    role: "Associate Editor (Social Sciences)",
    department: "Department of Economics",
    institution: "Shivaji College, University of Delhi",
  },
  {
    name: "Dr. Bishnu Charan Satapathy",
    role: "Associate Editor (Humanities)",
    department: "Department of Political Science & Humanities",
    institution: "Shivaji College, University of Delhi",
  },
  {
    name: "Dr. Suman Kharbanda",
    role: "Associate Editor (Professional Studies)",
    department: "Department of Commerce & Management",
    institution: "Shivaji College, University of Delhi",
  }
];

export const RESEARCH_PILLARS = [
  {
    id: "sciences",
    title: "Sciences & Technology",
    description: "Physical, chemical, biological sciences, computational modeling, nanotechnology, and sustainable environmental technologies.",
    icon: "Atom",
    count: "2 Papers"
  },
  {
    id: "social-sciences",
    title: "Social Sciences",
    description: "Economics, political science, sociology, public administration, gender studies, and inclusive developmental policy.",
    icon: "Globe2",
    count: "2 Papers"
  },
  {
    id: "humanities",
    title: "Humanities & Heritage",
    description: "History, philosophy, literature, cultural preservation, Modi script archives, ethics, and linguistic discourse.",
    icon: "BookOpen",
    count: "2 Papers"
  },
  {
    id: "professional-studies",
    title: "Professional Studies",
    description: "Commerce, business management, sustainable corporate governance (ESG), finance, and algorithmic information systems.",
    icon: "Briefcase",
    count: "2 Papers"
  }
];

export const JOURNAL_FEATURES = [
  {
    title: "Double-Blind Peer Review",
    desc: "Every submitted manuscript undergoes rigorous, confidential evaluation by independent subject-matter domain experts.",
    icon: "ShieldCheck"
  },
  {
    title: "Open Access Ethos",
    desc: "Free, unrestricted global digital access under CC-BY-NC 4.0 license to democratize knowledge dissemination.",
    icon: "Unlock"
  },
  {
    title: "Ethical Compliance",
    desc: "Strict adherence to Committee on Publication Ethics (COPE) standards with mandatory anti-plagiarism verification.",
    icon: "Award"
  },
  {
    title: "Permanent Archival & DOI",
    desc: "Digital Object Identifiers assigned to every published paper with long-term repository preservation.",
    icon: "Archive"
  }
];
